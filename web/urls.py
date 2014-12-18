## @file web/urls.py
#  @brief Django urls

from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin
import views

urlpatterns = patterns('',
                       url(r'^ajax/(?P<module>\w+)/(?P<function>\w+)/', views.ajax, name='ajax'),

                       url(r'^admin/', include(admin.site.urls) ),
                       url(r'^$', views.index, name='index')
)



