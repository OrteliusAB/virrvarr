import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import json from "@rollup/plugin-json"
import pkg from "./package.json"
import { terser } from "rollup-plugin-terser"

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

export default [
	{
		input: "./src/index.js",
		output: [
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.esm.js`,
				format: "esm",
				banner: BANNER
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.umd.js`,
				format: "umd",
				banner: BANNER,
				name: "Virrvarr",
				globals: {
					d3: "d3"
				}
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.iife.js`,
				format: "iife",
				banner: BANNER,
				name: "Virrvarr",
				globals: {
					d3: "d3"
				}
			}
		],
		external: ["d3", "corejs"],
		plugins: [
			json(),
			resolve(),
			commonjs(),
			babel({
				exclude: "node_modules/**",
				extensions: [".js"],
				babelHelpers: "bundled"
			})
		]
	},
	{
		input: "./src/index.js",
		output: [
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.esm.min.js`,
				format: "esm",
				banner: BANNER
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.umd.min.js`,
				format: "umd",
				banner: BANNER,
				name: "Virrvarr",
				globals: {
					d3: "d3"
				}
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.iife.min.js`,
				format: "iife",
				banner: BANNER,
				name: "Virrvarr",
				globals: {
					d3: "d3"
				}
			}
		],
		external: ["d3", "corejs"],
		plugins: [
			json(),
			resolve(),
			commonjs(),
			babel({
				exclude: "node_modules/**",
				extensions: [".js"],
				babelHelpers: "bundled"
			}),
			terser({
				format: {
					comments(node, comment) {
						const text = comment.value
						const type = comment.type
						if (type == "comment2") {
							return /@preserve|@license|@cc_on/i.test(text)
						}
					}
				}
			})
		]
	},
	{
		input: "./src/index.js",
		output: [
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.esm.full.min.js`,
				format: "esm",
				banner: BANNER
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.umd.full.min.js`,
				format: "umd",
				banner: BANNER,
				name: "Virrvarr",
				globals: {
					d3: "d3"
				}
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.iife.full.min.js`,
				format: "iife",
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
			terser({
				format: {
					comments(node, comment) {
						const text = comment.value
						const type = comment.type
						if (type == "comment2") {
							return /@preserve|@license|@cc_on/i.test(text)
						}
					}
				}
			})
		]
	},
	{
		input: "./src/index.js",
		output: [
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.esm.legacy.min.js`,
				format: "esm",
				banner: BANNER
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.umd.legacy.min.js`,
				format: "umd",
				banner: BANNER,
				name: "Virrvarr",
				globals: {
					d3: "d3"
				}
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.iife.legacy.min.js`,
				format: "iife",
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
			commonjs(),
			babel({
				exclude: "node_modules/**",
				extensions: [".js"],
				babelHelpers: "bundled",
				presets: [
					[
						"@babel/env",
						{
							modules: false,
							targets: {
								browsers: "> 0.25%, ie 11, not op_mini all, not dead",
								node: 8
							},
							useBuiltIns: "usage",
							corejs: 3
						}
					]
				]
			}),
			terser({
				format: {
					comments(node, comment) {
						const text = comment.value
						const type = comment.type
						if (type == "comment2") {
							return /@preserve|@license|@cc_on/i.test(text)
						}
					}
				}
			})
		]
	},
	{
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
			})
		]
	}
]
