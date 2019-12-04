# Liquid filter plugin for converting relative resource links to CDN links
#
# A Unix time value is added at the end of the link as query param
# in order to force CDN update upon redeployment
#
# Examples:
#   {{ "img.png" | to_cdn_url }}
#   # => "https://cf.jare.io/?u=https://next.cmlteam.com/img.png?1575391869"
#
#   {{ "css/style-all.css" | to_cdn_url }}
#   # => "https://cf.jare.io/?u=https://next.cmlteam.com/css/style-all.css?1575391869"
#
# source - relative URL string for a resource present on the server
#
# Returns the original URL with CDN proxy prefix from config and timestamp as
# query param to force CDN cache refresh
#

module Jekyll
  module CdnLink
    def to_cdn_url(source)
      @now_string = "#{Time.now.to_i}"
      @appendix = if source.include? "?" then :"&#{@now_string}" else :"?#{@now_string}" end
      "#{@context.registers[:site].config['resources_server_url']}/#{source}#{@appendix}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::CdnLink)
