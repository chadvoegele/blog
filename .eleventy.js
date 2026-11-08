module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "njk",
    "html",
    "css",
    "png",
    "svg"
  ]);
  eleventyConfig.addPassthroughCopy("posts/**/*{.js,.wasm}");
  eleventyConfig.addPassthroughCopy("posts/suppalist/model/*");
  eleventyConfig.addPassthroughCopy("posts/handwriting_worksheets/app");
  eleventyConfig.ignores.add("posts/handwriting_worksheets/app/**");
  eleventyConfig.ignores.add("posts/suppalist/copy.js");
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
}
