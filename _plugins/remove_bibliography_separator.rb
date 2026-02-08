# Remove "---" separator that jekyll-scholar/CSL adds before each bibliography entry
[ :pages, :documents ].each do | collection |
  Jekyll::Hooks.register collection, :post_render do |doc|
    next unless doc.respond_to?(:url) && doc.url.to_s =~ %r{/publications}
    doc.output = doc.output.gsub(%r{(<li[^>]*>)---}, '\1')
  end
end
