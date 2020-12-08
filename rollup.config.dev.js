import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import json from "@rollup/plugin-json"
import pkg from "./package.json"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"

import copy from "rollup-plugin-copy"

const DIST_FOLDER = "bundle"
const LIBRARY_NAME = "virrvarr"
const VERSION = pkg.version
const AUTHOR = pkg.author
const HOMEPAGE = pkg.homepage
const DESCRIPTION = pkg.description
const BANNER = `/** @preserve @license @cc_on
 * ----------------------------------------------------------
 * ${LIBRARY_NAME} version ${VERSION}
 * ${DESCRIPTION}
 * ${HOMEPAGE}
 * Copyright (c) ${new Date().getFullYear()} ${AUTHOR}
 * All Rights Reserved. MIT License
 * https://mit-license.org/
 * ----------------------------------------------------------
 */\n`

export default {
    input: "./src/index.js",
    output: [
        {
            file: `${DIST_FOLDER}/example/${LIBRARY_NAME}.js`,
            format: "umd",
            banner: BANNER,
            name: "Virrvarr",
            globals: {
                d3: "d3"
            }
        }
    ],
    external: [],
    plugins: [
        json(),
        resolve(),
        commonjs({
            include: "node_modules/d3/**"
        }),
        babel({
            exclude: "node_modules/**",
            extensions: [".js"],
            babelHelpers: "bundled"
        }),
        copy({
            targets: [
                { src: "src/data", dest: "bundle/example" },
                { src: "src/template.html", dest: "bundle/example/", rename: "index.html" }
            ]
        }),
        serve({
            open: true,
            openPage: "/index.html",
            contentBase: "bundle/example"
        }),
        livereload({
            watch: "bundle/example"
        })
    ]
}
