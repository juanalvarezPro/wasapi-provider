import typescript from 'rollup-plugin-typescript2'
import fs from 'node:fs'
import path from 'node:path'

const pkgPath = path.resolve(path.dirname(new URL(import.meta.url).pathname), 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
]

export default [
    {
        input: {
            index: 'src/index.ts',
            'provider/index': 'src/provider/index.ts',
        },
        external,
        output: [
            { dir: 'dist/esm', format: 'esm', preserveModules: true, sourcemap: false },
            { dir: 'dist/cjs', format: 'cjs', preserveModules: true, sourcemap: false, exports: 'named' },
        ],
        onwarn: (warning, warn) => {
            if (warning.code === 'UNRESOLVED_IMPORT') return
            warn(warning)
        },
        plugins: [
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: true,
                        declarationDir: 'dist/types',
                        outDir: 'dist/esm',
                        emitDeclarationOnly: false,
                    },
                },
                useTsconfigDeclarationDir: true,
                clean: true,
            }),
        ],
    },
]
