# Liquid filter plugin for converting relative resource links to
# Jare CDN links
#
# A Unix time value is added at the end of the link as query param
# in order to force CDN update upon redeployment
#
# Examples:
#   {{ "img.png" | hex_to_rgb }}
#   # => "https://cf.jare.io/?u=https://next.cmlteam.com/img.png?1575391869"
#
#   {{ "css/style-all.css" | hex_to_rgb }}
#   # => "https://cf.jare.io/?u=https://next.cmlteam.com/css/style-all.css?1575391869"
#
# source - relative URL string for a resource present on the server
#
# Returns a Jare CDN proxy for a resource, respective to config
#

module Jekyll
  module JareCdnLink
    def to_jare_cdn_url(source)
      "#{@context.registers[:site].config['resources_server_url']}/#{source}?#{Time.now.to_i}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::JareCdnLink)
