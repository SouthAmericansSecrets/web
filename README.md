# secretsofperu-web

Originally written for shared server with apache/php/mysql (typical lamp stack)

We're ready to move forward and off lamp.

- Reservations (requests) can be stored in firebase
- contact messages can be stored in firebase (chat-style)
- shtml gives us variables, templates : let's keep it because it's easy and just
transpile it to standard html on release branch (gh-pages):
https://github.com/kidwm/grunt-ssi
- paypal has changed their api quite a bit and things don't seem to work the way
they did 5 years ago - back then we needed an intermediary server, perhaps it is
not necessary anymore (pure ajax from client with cors)
- this work on paypal invoices is kinda interesting - half-assed working:
http://secretsofperu.com/admin2277/
- we need to add a couple of new programs
- we need a notification service (email) that can listen to a firebase endpoint
(ie chat messages and reservations) and, using template variables stored with
the firebase entry, merge with defined (nunjucks) templates to send both simple
text and rich text (responsive) emails
- the logo on this site doesn't translate well to print - they need a new logo
that is vectors/contiguous tones but continues with Tumi theme
- we need to host on github pages because it won't cost anything and we can also
abuse cloudflare to get us https for free
- continuous deployment on push to tag ( https://gist.github.com/domenic/ec8b0fc8ab45f39403dd )

# Update 02-17-2020
- Add Travis CI / CD
- Remove gulp, it was using a deprecated version.