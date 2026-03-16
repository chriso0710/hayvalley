---
title: Using webhooks with Telegram (Part 2)
---

In [Part 1](/telegram-map-bot), I showed how to create a bot using [long polling](https://core.telegram.org/bots/api#getupdates) and the [telegram-bot-ruby gem](https://github.com/atipugin/telegram-bot-ruby).

## Polling vs. webhooks

Polling is nothing but a periodic request from the client to the server. The server responds immediately with available data. If there is no new data an empty response will be send to the client.
With long polling the server holds the response until new data is available. Long polling is the extended version of polling, but you still have to ask the server.

On the other hand a webhook is a way to deliver real-time data to applications. Based on event triggers data gets sent immediately, which makes webhooks behave like push notifications.
A webhook is typically a simple POST HTTP(S) request with a payload. The request is sent to a pre-defined callback URI, where the server application is configured to handle the request.

Webhooks are far more efficient. They are clearly superior to polling in terms of speed, freshness of data, efficiency of communication and infrastructure costs.

My Telegram bots have been running for months now. But I was getting frequent errors and it looks like Telegram is sometimes having problems with their servers:

```
Mapbot -- Exception: Telegram::Bot::Exceptions::ResponseError: Telegram API has returned the error. (ok: "false", error_code: "500", description: "Internal server error: restart")
Mapbot -- Exception: Telegram::Bot::Exceptions::ResponseError: Telegram API has returned the error. (error_code: "502", uri: "https://api.telegram.org/.../getUpdates")
```

In [github issues](https://github.com/atipugin/telegram-bot-ruby/issues?utf8=%E2%9C%93&q=502) some users recommend to just rescue/ignore 5xx errors, but in my opinion this is not the right way to handle this.

Most of my are projects are running on heroku, which has been fantastic.
When using long polling you will need a seperate heroku worker for your bot, which adds costs. But probably you will already have a web process in your project. This makes the bot worker obsolete when integrating the Telegram webhooks into your web process.

As the Telegram API supports [webhooks](https://core.telegram.org/bots/api#setwebhook), I was ready to switch.

## Hooking up with Telegram

The docs for [telegram-bot-ruby gem](https://github.com/atipugin/telegram-bot-ruby) on using webhooks are a bit sparse. I am [trying to improve](https://github.com/atipugin/telegram-bot-ruby/pull/162) that ;-)

It is easily possible to use the gem to process the webhook payload and use the gems nice API wrapper for it.

### Setting the webhook url for your bot

To make Telegram aware of your webbook you need to set it. The API has a corresponding set_webhook endpoint.

A possible rake task:

```ruby
task :telegramwebhook do
    require 'telegram/bot'
    HOOK_URL = "https://<your server url>/telegram"
    bot = Telegram::Bot::Api.new(ENV['TELEGRAM_BOT_API_TOKEN'])
    puts bot.set_webhook(url: HOOK_URL)
end
```

### Handling webhooks

You need to implement your own webhook callbacks server. Telegram sends all data via a POST request with a JSON payload.

A quick start example with Sinatra:

```ruby
API = "https://api.telegram.org/file/bot"

post '/telegram' do
    request.body.rewind
    data = JSON.parse(request.body.read)
    @bot = Telegram::Bot::Api.new(ENV['TELEGRAM_BOT_API_TOKEN'])
    @message = Telegram::Bot::Types::Update.new(data).message
    puts "Message received: #{@message.inspect}"
    case @message.text
        when '/start'
            @bot.send_message(chat_id: @message.chat.id, text: "Hi, #{@message.from.first_name}, nice to see you")
        when '/stop'
            @bot.send_message(chat_id: @message.chat.id, text: "Bye, #{@message.from.first_name}")
        when '/help'
            @bot.send_message(chat_id: @message.chat.id, text: "some help...")
        else
            # do something with the message
            # maybe check for attachment
            if @message.photo.any? then
                result = @bot.getFile(file_id: @message.photo.last.file_id)
                telegramurl = "#{API}#{ENV['TELEGRAM_BOT_API_TOKEN']}/#{result["result"]["file_path"]}" if result["ok"]
                # download photo and process
            end
            @bot.send_message(chat_id: @message.chat.id, text: "Thank you, #{@message.from.first_name}")
    end    
    status 200
end
```

## Final thoughts

I think there is no benefit in using long polling for your Telegram bot. Implementing webhooks into your web process (or into a separate minimal webserver), which handles the webhook callbacks, is much less error prone, much more resource efficient and superior in every way.

Coming up in a future article: I recently created a Facebook Messenger bot for [SENDONSCREEN](https://send.on-screen.info) with Ruby. Needless to say Facebook is solely supporting webhooks for Messenger bots. That makes a lot of sense, Facebook! :-)
