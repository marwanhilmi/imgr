/**
 * Module dependencies.
 */

var express = require('express')
  , mkdirp = require('mkdirp')
  , fs = require('fs')
  , child = require('child_process')
  , path = require('path')
  , utils = require('./utils');

/**
 * Default image server options.
 */

var default_options = {
    namespace: '/'
  , cache_dir: '/tmp'
  , url_rewrite: '/:path/:size/:orientation/:filename'
  , whitelist: false
  , blacklist: false
};

/**
 * Create a new static image server.
 *
 * @param {String} path - where to serve images from
 * @param {Object} options (optional)
 */

var Server = exports.Server = function (path, options) {
    this.path = path;
    this.options = utils.mergeDefaults(options, default_options);
};

/**
 * Set the image namespace.
 *
 * @param {String} namespace - e.g. /images
 * @return this
 */

Server.prototype.namespace = function (namespace) {
    this.options.namespace = namespace;
    return this;
};

/**
 * Set the cached/compiled image directory.
 *
 * @param {String} path
 * @return this
 */

Server.prototype.cacheDir = function (cache_dir) {
    this.options.cache_dir = cache_dir;
    return this;
};

/**
 * Whitelist image sizes. Image sizes are specified using 'WIDTHxHEIGHT' where
 * either the width or height can be omitted, e.g. '200x300' or just '200x' to
 * allow images with a width of 200 and any height. Pass `false` to disable
 * the whitelist.
 *
 * @param {String|Array|Boolean} whitelist
 * @return this
 */

Server.prototype.whitelist = function (whitelist) {
    if (!Array.isArray(whitelist)) {
        whitelist = [ whitelist ];
    }
    this.options.whitelist = whitelist;
    return this;
};

/**
 * Blacklist image sizes. The parameters are the same as `whitelist()`.
 *
 * @param {String|Array|Boolean} blacklist
 * @return this
 */

Server.prototype.blacklist = function (blacklist) {
    if (!Array.isArray(blacklist)) {
        blacklist = [ blacklist ];
    }
    this.options.blacklist = blacklist;
    return this;
};

/**
 * Set the rewriting strategy. Accepted tokens are :path (dirname), :filename (basename),
 * :size (e.g. 200x200) and :orientation (e.g. centre). Size and orientation are optional
 * and are used to resize the image on demand. Pass `false` to disable url rewriting.
 *
 * Example using '/:path/:size/:orientation/:filename':
 *
 *    /images/foobar.jpg => serves the unaltered image
 *    /images/200x300/centre/foobar.jpg => crops/resizes /images/foobar.jpg to exactly 200x300
 *    /images/400x/foobar.jpg => resizes /images/foobar.jpg to 400 pixels wide
 *
 * @param {String|Boolean} url_rewrite
 * @return this
 */

Server.prototype.urlRewrite = function (url_rewrite) {
    this.options.url_rewrite = url_rewrite;
    return this;
}

/**
 * Bind an express app and begin serving images.
 *
 * @param {ExpressApp} express
 * @return this
 */

Server.prototype.using = function (app) {
    this.app = app;

    //TODO
};
