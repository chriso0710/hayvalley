---
title: Receiving Whatsapp messages and posting them to a (Ruby) web service
---
It had to receive Whatsapp messages in a Ruby webservice. To be absolutely clear: Just for receiving, no sending and no spamming.

As there is no Ruby library for hacking Whatsapp, I used the [yowsup](https://github.com/tgalal/yowsup) python library. I made a small python script, which runs on heroku and receives whatsapp messages of various types (text, photo, video). After reception Python creates a JSON payload from the message data and posts (pushes) it via http to a web server, which just "happens" to run Ruby and save the Whatsapp message for further processing. Works good and yowsup did well in keeping up with the recent changes Whatsapp made for supporting encryption. Job done :-)

I am using a german virtual phone number for yowsup.

[See the source at github](https://github.com/chriso0710/waposter){: .btn .btn--success}

## Posting Whatsapp messages

The following method captures all message data in a dict and converts it to JSON. Depending on the whatsapp message type the corresponding fields are set.
It then uses the requests library to send the JSON data to the server with a POST request.

```python
def postit(self, message, url = None):
        paramdict = {}

        if message.getType() == 'text':
            paramdict['messagecontent'] = message.getBody()
        if message.getType() == 'media':
            paramdict['messagecontent'] = message.getCaption()
            #paramdict['url']            = message.getMediaUrl()
            paramdict['url']            = url
            paramdict['size']           = message.getMediaSize()
            paramdict['mediatype']      = message.getMediaType()
            paramdict['mimetype']       = message.getMimeType()

        paramdict['messageid']      = message.getId()
        paramdict['type']           = message.getType()
        paramdict['to']             = message.getTo()
        paramdict['from']           = message.getFrom(False)
        paramdict['notify']         = message.getNotify()
        paramdict['participant']    = message.getParticipant()
        paramdict['timestamp']      = message.getTimestamp()
        paramdict['tag']            = message.getTag()

        post_data = json.dumps(paramdict)
        print post_data
        url = os.environ['URL']
        try:
            r = self.s.post(url, post_data)
            print r.status_code
            print r.headers
            return True
        except (requests.exceptions.RetryError, requests.exceptions.ConnectionError) as e:
            print e
            return False
```

To make the script a little more robust, it retries with the following requests options.
The method_whitelist is important, otherwise requests will not retry POSTs.

```python
    s = requests.Session()
    retries = Retry(total=5,
                 backoff_factor=0.2,
                 method_whitelist=["GET", "POST"],
                 status_forcelist=[ 500, 502, 503, 504 ])
    s.mount('http://', HTTPAdapter(max_retries=retries))
    s.mount('https://', HTTPAdapter(max_retries=retries))
```

## Update Jun 2016: yowsup is dead

Bye bye, yowsup. I am leaving. It really was a bumpy ride.

Yowsup worked well for a year, but now it becoming practically useless. The amount of time I spent to try to keep my little yowsup client running is becoming ridiculous. My virtual phone number was blocked and I am giving up now. Whatsapp apprently became very good in detecting and blocking 3rd party clients. Lots of people got blocked now.

I do not really understand Facebooks policy when they open up the Facebook Messenger with a [new bot API](https://developers.facebook.com/blog/post/2016/04/12/bots-for-messenger/) and at the same time are leaving Whatsapp behind. I really hope Whatsapp will someday publish a full business API, which makes it easier for us to connect to it. See
[Whatsapp Blog](https://blog.whatsapp.com/615/Making-WhatsApp-free-and-more-useful?l=en&set=yes)

In the last couple of days I made a Telegram bot with Telegrams great API, Ruby and the [ruby telegram gem](https://github.com/atipugin/telegram-bot-ruby). That was easy, fun and the bot is working great. This was simply no comparison to my Whatsapp-yowsup experience.

So farewell, yowsup, until we meet again ;-)

## Update Aug 2015: Chat-API is dead, too

The PHP alternative to yowsup, Chat-API, is dead too. See
the [project page](https://github.com/mgp25/Chat-API/issues/2116).
Of course they are all having the same problems: Whatsapps detection mechanism is becoming better and more aggressive.

## Update Nov 2016: Bot API for Whatsapp coming in 2017?

In 2017 we might finally be able use the new official Whatsapp API. See the news on [Yahoo](http://finance.yahoo.com/news/mark-zuckerberg-just-explained-close-231734770.html).

I will keep my fingers crossed.
