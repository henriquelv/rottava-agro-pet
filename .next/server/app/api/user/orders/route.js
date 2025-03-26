"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/user/orders/route";
exports.ids = ["app/api/user/orders/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "@prisma/client/runtime/library":
/*!*************************************************!*\
  !*** external "@prisma/client/runtime/library" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/library");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Forders%2Froute&page=%2Fapi%2Fuser%2Forders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Forders%2Froute.ts&appDir=C%3A%5CUsers%5CHenrique%5CDesktop%5CSite%20Rottava%20Agro%20Pet%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHenrique%5CDesktop%5CSite%20Rottava%20Agro%20Pet&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Forders%2Froute&page=%2Fapi%2Fuser%2Forders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Forders%2Froute.ts&appDir=C%3A%5CUsers%5CHenrique%5CDesktop%5CSite%20Rottava%20Agro%20Pet%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHenrique%5CDesktop%5CSite%20Rottava%20Agro%20Pet&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Henrique_Desktop_Site_Rottava_Agro_Pet_src_app_api_user_orders_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/user/orders/route.ts */ \"(rsc)/./src/app/api/user/orders/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/orders/route\",\n        pathname: \"/api/user/orders\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/orders/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Henrique\\\\Desktop\\\\Site Rottava Agro Pet\\\\src\\\\app\\\\api\\\\user\\\\orders\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Henrique_Desktop_Site_Rottava_Agro_Pet_src_app_api_user_orders_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/user/orders/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGb3JkZXJzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyJTJGb3JkZXJzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlciUyRm9yZGVycyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNIZW5yaXF1ZSU1Q0Rlc2t0b3AlNUNTaXRlJTIwUm90dGF2YSUyMEFncm8lMjBQZXQlNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0hlbnJpcXVlJTVDRGVza3RvcCU1Q1NpdGUlMjBSb3R0YXZhJTIwQWdybyUyMFBldCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUMwQztBQUN2SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzZKOztBQUU3SiIsInNvdXJjZXMiOlsid2VicGFjazovL3JvdHRhdmEtYWdyby1wZXQvPzdiNmMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcSGVucmlxdWVcXFxcRGVza3RvcFxcXFxTaXRlIFJvdHRhdmEgQWdybyBQZXRcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcdXNlclxcXFxvcmRlcnNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3VzZXIvb3JkZXJzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXNlci9vcmRlcnNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VzZXIvb3JkZXJzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcSGVucmlxdWVcXFxcRGVza3RvcFxcXFxTaXRlIFJvdHRhdmEgQWdybyBQZXRcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcdXNlclxcXFxvcmRlcnNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvdXNlci9vcmRlcnMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0LCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Forders%2Froute&page=%2Fapi%2Fuser%2Forders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Forders%2Froute.ts&appDir=C%3A%5CUsers%5CHenrique%5CDesktop%5CSite%20Rottava%20Agro%20Pet%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHenrique%5CDesktop%5CSite%20Rottava%20Agro%20Pet&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_2__.PrismaClient();\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Senha\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Credenciais inv\\xe1lidas\");\n                }\n                // Para facilitar o teste, permitir login com o email do administrador\n                if (credentials.email === \"henrique.vmoreno@gmail.com\") {\n                    return {\n                        id: \"admin-id\",\n                        email: \"henrique.vmoreno@gmail.com\",\n                        name: \"Henrique Moreno\",\n                        role: \"admin\"\n                    };\n                }\n                const user = await prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user || !user?.password) {\n                    throw new Error(\"Usu\\xe1rio n\\xe3o encontrado\");\n                }\n                const isCorrectPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"].compare(credentials.password, user.password);\n                if (!isCorrectPassword) {\n                    throw new Error(\"Senha incorreta\");\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.email === \"henrique.vmoreno@gmail.com\" ? \"admin\" : \"user\"\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET || \"seu-segredo-aqui\",\n    pages: {\n        signIn: \"/login\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token && session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    }\n};\nconst handler = (0,next_auth_next__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ2lFO0FBQ2I7QUFDUDtBQUNoQjtBQUNRO0FBRXJDLE1BQU1LLFNBQVMsSUFBSUgsd0RBQVlBO0FBRXhCLE1BQU1JLGNBQStCO0lBQzFDQyxTQUFTTixtRUFBYUEsQ0FBQ0k7SUFDdkJHLFdBQVc7UUFDVFIsMkVBQW1CQSxDQUFDO1lBQ2xCUyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFTQyxNQUFNO2dCQUFXO1lBQy9DO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pELE1BQU0sSUFBSUUsTUFBTTtnQkFDbEI7Z0JBRUEsc0VBQXNFO2dCQUN0RSxJQUFJTixZQUFZQyxLQUFLLEtBQUssOEJBQThCO29CQUN0RCxPQUFPO3dCQUNMTSxJQUFJO3dCQUNKTixPQUFPO3dCQUNQRixNQUFNO3dCQUNOUyxNQUFNO29CQUNSO2dCQUNGO2dCQUVBLE1BQU1DLE9BQU8sTUFBTWQsT0FBT2MsSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3hDQyxPQUFPO3dCQUFFVixPQUFPRCxZQUFZQyxLQUFLO29CQUFDO2dCQUNwQztnQkFFQSxJQUFJLENBQUNRLFFBQVEsQ0FBQ0EsTUFBTUwsVUFBVTtvQkFDNUIsTUFBTSxJQUFJRSxNQUFNO2dCQUNsQjtnQkFFQSxNQUFNTSxvQkFBb0IsTUFBTW5CLHdEQUFjLENBQzVDTyxZQUFZSSxRQUFRLEVBQ3BCSyxLQUFLTCxRQUFRO2dCQUdmLElBQUksQ0FBQ1EsbUJBQW1CO29CQUN0QixNQUFNLElBQUlOLE1BQU07Z0JBQ2xCO2dCQUVBLE9BQU87b0JBQ0xDLElBQUlFLEtBQUtGLEVBQUU7b0JBQ1hOLE9BQU9RLEtBQUtSLEtBQUs7b0JBQ2pCRixNQUFNVSxLQUFLVixJQUFJO29CQUNmUyxNQUFNQyxLQUFLUixLQUFLLEtBQUssK0JBQStCLFVBQVU7Z0JBQ2hFO1lBQ0Y7UUFDRjtLQUNEO0lBQ0RhLFNBQVM7UUFDUEMsVUFBVTtRQUNWQyxRQUFRLEtBQUssS0FBSyxLQUFLO0lBQ3pCO0lBQ0FDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZSxJQUFJO0lBQ3ZDQyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVoQixJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUmdCLE1BQU1qQixJQUFJLEdBQUdDLEtBQUtELElBQUk7Z0JBQ3RCaUIsTUFBTWxCLEVBQUUsR0FBR0UsS0FBS0YsRUFBRTtZQUNwQjtZQUNBLE9BQU9rQjtRQUNUO1FBQ0EsTUFBTVgsU0FBUSxFQUFFQSxPQUFPLEVBQUVXLEtBQUssRUFBRTtZQUM5QixJQUFJQSxTQUFTWCxRQUFRTCxJQUFJLEVBQUU7Z0JBQ3pCSyxRQUFRTCxJQUFJLENBQUNGLEVBQUUsR0FBR2tCLE1BQU1sQixFQUFFO2dCQUMxQk8sUUFBUUwsSUFBSSxDQUFDRCxJQUFJLEdBQUdpQixNQUFNakIsSUFBSTtZQUNoQztZQUNBLE9BQU9NO1FBQ1Q7SUFDRjtBQUNGLEVBQUM7QUFFRCxNQUFNWSxVQUFVaEMsMERBQVFBLENBQUNFO0FBRWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm90dGF2YS1hZ3JvLXBldC8uL3NyYy9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz8wMDk4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gJ25leHQtYXV0aCdcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscydcclxuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gJ0BhdXRoL3ByaXNtYS1hZGFwdGVyJ1xyXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcydcclxuaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aC9uZXh0J1xyXG5cclxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcclxuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogJ2NyZWRlbnRpYWxzJyxcclxuICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnU2VuaGEnLCB0eXBlOiAncGFzc3dvcmQnIH1cclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDcmVkZW5jaWFpcyBpbnbDoWxpZGFzJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFBhcmEgZmFjaWxpdGFyIG8gdGVzdGUsIHBlcm1pdGlyIGxvZ2luIGNvbSBvIGVtYWlsIGRvIGFkbWluaXN0cmFkb3JcclxuICAgICAgICBpZiAoY3JlZGVudGlhbHMuZW1haWwgPT09ICdoZW5yaXF1ZS52bW9yZW5vQGdtYWlsLmNvbScpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiAnYWRtaW4taWQnLFxyXG4gICAgICAgICAgICBlbWFpbDogJ2hlbnJpcXVlLnZtb3Jlbm9AZ21haWwuY29tJyxcclxuICAgICAgICAgICAgbmFtZTogJ0hlbnJpcXVlIE1vcmVubycsXHJcbiAgICAgICAgICAgIHJvbGU6ICdhZG1pbidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVc3XDoXJpbyBuw6NvIGVuY29udHJhZG8nKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNDb3JyZWN0UGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShcclxuICAgICAgICAgIGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxyXG4gICAgICAgICAgdXNlci5wYXNzd29yZFxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgaWYgKCFpc0NvcnJlY3RQYXNzd29yZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZW5oYSBpbmNvcnJldGEnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgICByb2xlOiB1c2VyLmVtYWlsID09PSAnaGVucmlxdWUudm1vcmVub0BnbWFpbC5jb20nID8gJ2FkbWluJyA6ICd1c2VyJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiAnand0JyxcclxuICAgIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAsIC8vIDMwIGRpYXNcclxuICB9LFxyXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVUIHx8ICdzZXUtc2VncmVkby1hcXVpJyxcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiAnL2xvZ2luJyxcclxuICB9LFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGU7XHJcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xyXG4gICAgICBpZiAodG9rZW4gJiYgc2Vzc2lvbi51c2VyKSB7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nO1xyXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHNlc3Npb247XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpXHJcblxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH0gIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJQcmlzbWFBZGFwdGVyIiwiUHJpc21hQ2xpZW50IiwiYmNyeXB0IiwiTmV4dEF1dGgiLCJwcmlzbWEiLCJhdXRoT3B0aW9ucyIsImFkYXB0ZXIiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiRXJyb3IiLCJpZCIsInJvbGUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNDb3JyZWN0UGFzc3dvcmQiLCJjb21wYXJlIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwibWF4QWdlIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCIsInBhZ2VzIiwic2lnbkluIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/app/api/user/orders/route.ts":
/*!******************************************!*\
  !*** ./src/app/api/user/orders/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/api/auth/[...nextauth]/route */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_2__.PrismaClient();\nasync function GET() {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.id) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                message: \"N\\xe3o autorizado\"\n            }, {\n                status: 401\n            });\n        }\n        const orders = await prisma.order.findMany({\n            where: {\n                userId: session.user.id\n            },\n            include: {\n                items: {\n                    include: {\n                        variant: {\n                            include: {\n                                product: {\n                                    include: {\n                                        images: true\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json(orders);\n    } catch (error) {\n        console.error(\"Erro ao buscar pedidos:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            message: \"Erro ao buscar pedidos\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.id) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                message: \"N\\xe3o autorizado\"\n            }, {\n                status: 401\n            });\n        }\n        const body = await request.json();\n        const { items, addressId, total } = body;\n        if (!items?.length || !addressId || total === undefined) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                message: \"Dados do pedido inv\\xe1lidos\"\n            }, {\n                status: 400\n            });\n        }\n        const order = await prisma.order.create({\n            data: {\n                userId: session.user.id,\n                addressId,\n                total,\n                status: \"pendente\",\n                items: {\n                    create: items.map((item)=>({\n                            variantId: item.variantId,\n                            quantity: item.quantity,\n                            price: item.price\n                        }))\n                }\n            },\n            include: {\n                items: {\n                    include: {\n                        variant: {\n                            include: {\n                                product: {\n                                    include: {\n                                        images: true\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        });\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json(order, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Erro ao criar pedido:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            message: \"Erro ao criar pedido\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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InNvdXJjZXMiOlsid2VicGFjazovL3JvdHRhdmEtYWdyby1wZXQvLi9zcmMvYXBwL2FwaS91c2VyL29yZGVycy9yb3V0ZS50cz8xN2IxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xyXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJ1xyXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlJ1xyXG5cclxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcclxuXHJcbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IG1lc3NhZ2U6ICdOw6NvIGF1dG9yaXphZG8nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcmRlcnMgPSBhd2FpdCBwcmlzbWEub3JkZXIuZmluZE1hbnkoe1xyXG4gICAgICB3aGVyZTogeyB1c2VySWQ6IHNlc3Npb24udXNlci5pZCB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgaXRlbXM6IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgdmFyaWFudDoge1xyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3Q6IHtcclxuICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlczogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2Rlc2MnIH1cclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG9yZGVycylcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgcGVkaWRvczonLCBlcnJvcilcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBtZXNzYWdlOiAnRXJybyBhbyBidXNjYXIgcGVkaWRvcycgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxyXG5cclxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgbWVzc2FnZTogJ07Do28gYXV0b3JpemFkbycgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxyXG4gICAgY29uc3QgeyBpdGVtcywgYWRkcmVzc0lkLCB0b3RhbCB9ID0gYm9keVxyXG5cclxuICAgIGlmICghaXRlbXM/Lmxlbmd0aCB8fCAhYWRkcmVzc0lkIHx8IHRvdGFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgbWVzc2FnZTogJ0RhZG9zIGRvIHBlZGlkbyBpbnbDoWxpZG9zJyB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3JkZXIgPSBhd2FpdCBwcmlzbWEub3JkZXIuY3JlYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxyXG4gICAgICAgIGFkZHJlc3NJZCxcclxuICAgICAgICB0b3RhbCxcclxuICAgICAgICBzdGF0dXM6ICdwZW5kZW50ZScsXHJcbiAgICAgICAgaXRlbXM6IHtcclxuICAgICAgICAgIGNyZWF0ZTogaXRlbXMubWFwKChpdGVtOiBhbnkpID0+ICh7XHJcbiAgICAgICAgICAgIHZhcmlhbnRJZDogaXRlbS52YXJpYW50SWQsXHJcbiAgICAgICAgICAgIHF1YW50aXR5OiBpdGVtLnF1YW50aXR5LFxyXG4gICAgICAgICAgICBwcmljZTogaXRlbS5wcmljZVxyXG4gICAgICAgICAgfSkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgaXRlbXM6IHtcclxuICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgdmFyaWFudDoge1xyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3Q6IHtcclxuICAgICAgICAgICAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlczogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihvcmRlciwgeyBzdGF0dXM6IDIwMSB9KVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGNyaWFyIHBlZGlkbzonLCBlcnJvcilcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBtZXNzYWdlOiAnRXJybyBhbyBjcmlhciBwZWRpZG8nIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKVxyXG4gIH1cclxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsIlByaXNtYUNsaWVudCIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiR0VUIiwic2Vzc2lvbiIsInVzZXIiLCJpZCIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzIiwib3JkZXJzIiwib3JkZXIiLCJmaW5kTWFueSIsIndoZXJlIiwidXNlcklkIiwiaW5jbHVkZSIsIml0ZW1zIiwidmFyaWFudCIsInByb2R1Y3QiLCJpbWFnZXMiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwiZXJyb3IiLCJjb25zb2xlIiwiUE9TVCIsInJlcXVlc3QiLCJib2R5IiwiYWRkcmVzc0lkIiwidG90YWwiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJjcmVhdGUiLCJkYXRhIiwibWFwIiwiaXRlbSIsInZhcmlhbnRJZCIsInF1YW50aXR5IiwicHJpY2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/user/orders/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/@auth","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Forders%2Froute&page=%2Fapi%2Fuser%2Forders%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Forders%2Froute.ts&appDir=C%3A%5CUsers%5CHenrique%5CDesktop%5CSite%20Rottava%20Agro%20Pet%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHenrique%5CDesktop%5CSite%20Rottava%20Agro%20Pet&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();