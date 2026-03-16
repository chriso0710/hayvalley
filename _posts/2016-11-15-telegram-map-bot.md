---
title: Creating a map and geocoding bot for Telegram (Part 1)
---

I love [Telegram](https://telegram.org/) and it's [bot API](https://core.telegram.org/bots), which is designed brilliantly. The API could very well serve as an example for other messengers (Yes, Whatsapp, I am looking at you!).

Working as head of development for Carl Group in Hamburg, a few months ago I made my first Telegram bot for
[SENDONSCREEN](http://send.on-screen.info/?locale=en).

I saw [Chris](https://twitter.com/ChrisSheldrick2) from [What3words](http://what3words.com/) at the Dmexco conference in September and was very impressed by his talk and the fantastic idea.
Since then I have been thinking about making use of What3words.  

## Call me "the Blue Marble"

![Picture](/assets/images/globe.png){: .align-right}
So I developed a Telegram bot as a little "side project" just for fun and for learning a couple of new things. I called it the Blue marble and it does forward and reverse geocoding with the help of Openstreetmap, Google, Bing, Mapbox and the free [What3words API](https://github.com/what3words/w3w-ruby-wrapper).

The Blue marble has the following features:

- fast because of caching and multithreading
- works inline
- easy command syntax, help text
- shows maps from Openstreetmap/Mapbox with different zoom levels
- does multi geocoding from different geo providers, with fail-over
- asks for the users location and reverse it to address and What3words
- converts address to latitude-longitude (DD or DMS) to What3words and reverse
- outputs What3words addresses in all supported languages with direct links to the What3words map
- uses Ruby threads for reverse geocoding multiple results
- uses Redis for API request caching
- caches user preferences like language and zoom level for some time
- receives user feedback

## What does it look like?

<figure class="third">
	<img src="/assets/images/bluemarble/iphone.jpg">
	<img src="/assets/images/bluemarble/android.jpg">
	<img src="/assets/images/bluemarble/mac.jpg">
	<figcaption>Screenshots from iOS, Android, Mac desktop client</figcaption>
</figure>

[Get the Blue marble bot](https://telegram.me/bluemarblebot){: .btn .btn--success}

## Ruby is great for making bots (and everything else, too :-)

Blue marble is made with Ruby and runs great on trusty Heroku.

I mainly used the following gems for the bot:

```ruby
gem "semantic_logger"
gem "telegram-bot-ruby"
gem "redis", "~>3.2"
gem "typhoeus"
gem "what3words", "~> 2.0"
gem "poscvt"
gem "geokit", :github => "chriso0710/geokit"
```

I made my first bot with the [telegram-bot-ruby gem](https://github.com/atipugin/telegram-bot-ruby) and had no problems at all with it. It supports all Telegram bot API features, including custom keyboards, inline mode and image uploading.

I looked at the popular Ruby geocoding gems [geocoder](https://github.com/alexreisner/geocoder) and [geokit](https://github.com/geokit/geokit) and finally settled for Geokit. Geokit has a great multi geocoding feature with a fail-over mechanism, which starts up if you hit rate limits or other errors. Blue marble uses the following providers in this order: Google, Openstreetmap, Bing.

I use [Typhoeus](https://github.com/typhoeus/typhoeus) for making all API request to geo providers. Typhoeus has a great caching feature and I use Redis for caching API results.

## Geocode inline

So how does the [inline mode](https://core.telegram.org/bots/inline) work with telegram-bot-ruby?
This is the main loop, which receives the bot updates and passes them on to the messagehandler class:

```ruby
Telegram::Bot::Client.run(TOKEN) do |bot|
    begin
        logger.info "Bot started"
        bot.listen do |message|
            logger.tagged("#{message.from.id} #{message.from.username}") do
                handler = MessageHandler.new(bot, message)
                handler.debug
                case message
                    when Telegram::Bot::Types::InlineQuery
                        # inline query
                        handler.inline(message.query) if message.query != ""
                    when Telegram::Bot::Types::CallbackQuery
                        # handle callbacks from inline buttons
                        handler.callback
                    when Telegram::Bot::Types::Message
                        # handle text or location message
                        # ...
                end
            end
        end
    rescue Telegram::Bot::Exceptions::ResponseError => e
        logger.fatal e
    end
end
```

This is main part of the method, which handles and responds to the inline queries. The bot does geocoding in threads to speed things up. It then creates a result array of type InlineQueryResultArticle and sends it back to the user.

```ruby
class MessageHandler

    def inline(text)
        r = Geokit::Geocoders::MultiGeocoder.geocode text, :provider_order => ORDER
        if r.success?
            threads = []
            r.all.each_with_index do |geo, index|
                threads << Thread.new do
                    Thread.current.name = "Thread #{index} #{geo.full_address}"
                    Thread.current["index"] = index
                    Thread.current["answertitle"] = geo.full_address
                    Thread.current["answertext"] = formatlocation(geo)
                    geo.country_code ? Thread.current["country"] = geo.country_code.downcase : Thread.current["country"] = ""
                end
            end
            answers = []
            threads.each do |t|
                t.join
                answers << Telegram::Bot::Types::InlineQueryResultArticle.new(
                    id: t["index"],
                    title: t["answertitle"],
                    thumb_url: sprintf(FLAGURL, t["country"]),
                    input_message_content: Telegram::Bot::Types::InputTextMessageContent.new(message_text: t["answertext"], parse_mode: "HTML"))
            end
            @bot.api.answer_inline_query(inline_query_id: @message.id, results: answers)
        end
    end

end
```

That's the core of the inline query handling. The rest is dealing with all other messages, doing reverse geocoding, smart regular expressions and some caching of API calls and user preferences ;-)

It's not difficult to make a Telegram bot when you are using the right tools and libraries for the job. Another reason for loving Ruby and the high quality of Ruby gems out there!

The blue marble icon is under [Creative Commons Attribution-No Derivative Works 3.0 Unported License](https://creativecommons.org/licenses/by-nd/3.0/)
