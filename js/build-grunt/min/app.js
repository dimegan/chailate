!function(){"use strict";angular.module("chaiApp",["chaiApp.core","chaiApp.widgets","chaiApp.home","chaiApp.design","chaiApp.mkt","chaiApp.dev","chaiApp.photo","chaiApp.devDetail"])}(),function(){"use strict";angular.module("blocks.router",["ngRoute"])}(),function(){"use strict";function a(){this.config={},this.$get=function(){return{config:this.config}}}function b(a,b,c,d){function e(a){a.forEach(function(a){a.config.resolve=angular.extend(a.config.resolve||{},d.config.resolveAlways),m.when(a.url,a.config)}),m.otherwise({redirectTo:"/"})}function f(){b.$on("$routeChangeError",function(b,c,d,e){if(!j){k.errors++,j=!0;var f=c&&(c.title||c.name||c.loadedTemplateUrl)||"unknown target";"Error routing to "+f+". "+(e.msg||"");a.path("/")}})}function g(){f(),i()}function h(){for(var a in c.routes)if(c.routes.hasOwnProperty(a)){var b=c.routes[a],d=!!b.title;d&&l.push(b)}return l}function i(){b.$on("$routeChangeSuccess",function(a,c,e){k.changes++,j=!1;var f=d.config.docTitle+" "+(c.title||"");b.title=f})}var j=!1,k={errors:0,changes:0},l=[],m=d.config.$routeProvider,n={configureRoutes:e,getRoutes:h,routeCounts:k};return g(),n}angular.module("blocks.router").provider("routehelperConfig",a).factory("routehelper",b),b.$inject=["$location","$rootScope","$route","routehelperConfig"]}();