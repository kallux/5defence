import os
import random
import re
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp import util
from django.utils import simplejson

class MainHandler(webapp.RequestHandler):

    def get(self):
        path = 'index.html'
        self.response.headers['Content-Type'] = 'text/html; charset=utf-8';
        self.response.out.write(template.render(path, {
            'url': self.request.url,
        }))

def main():
    application = webapp.WSGIApplication([
        ('/.*', MainHandler),
    ], debug=True)
    util.run_wsgi_app(application)

if __name__ == '__main__':
    main()
