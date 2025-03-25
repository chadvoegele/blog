#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const sourceDir = path.join(import.meta.dirname, '../../../github.com/chadvoegele/suppa/suplistjs/')
const outputDir = import.meta.dirname

function copyFile(source, destination) {
  fs.copyFileSync(source, destination)
  console.log(`Copied: ${source} -> ${destination}`)
}

fs.readdirSync(path.join(sourceDir, 'dist')).forEach(file => {
  if (file === 'index.html') {
    return
  }

  const sourcePath = path.join(sourceDir, 'dist', file)
  const destPath = path.join(outputDir, file)
  copyFile(sourcePath, destPath)
})

function copyStaticFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const sourcePath = path.join(dir, file)
    const relativePath = path.relative(path.join(sourceDir, 'static'), sourcePath)
    const destPath = path.join(outputDir, relativePath)

    const destDir = path.dirname(destPath)
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    copyFile(sourcePath, destPath)
  })
}

copyStaticFiles(path.join(sourceDir, 'static', 'model'))

console.log('File copying completed.')
