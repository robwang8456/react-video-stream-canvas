import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

// New 
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

// import packageJson from "./package.json" assert { type: "json" };
const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",

        output: [
            {
                file: packageJson.main,
                format: "esm",
                sourcemap: true,
            },
        ],

        plugins: [
            // New
            typescript(),
            peerDepsExternal(),

            resolve(),
            commonjs(),

            // New 
            terser(),
        ],
    },
    {
        input: "dist/cjs/types/src/index.d.ts",

        output: [{
            file: "dist/index.d.ts",
            format: "esm",
            sourcemap: true,
        }],

        plugins: [dts.default()],

        external: [/\.css$/],
    },
];