require 'json'
pkg = JSON.parse(File.read('package.json'))

Pod::Spec.new do |s|

  s.name            = 'platform-colors'
  s.version         = pkg["version"]
  s.homepage        = pkg["homepage"]
  s.license         = pkg["license"]
  s.author          = { "Klarna" => "open.source@klarna.com" }
  s.summary         = pkg["description"]
  s.source          = { :git => pkg["repository"], :tag => "v#{s.version}" }
  s.source_files    = 'ios/*.{h,m}'
  s.preserve_paths  = "**/*.js"
  s.requires_arc    = true
  s.platform        = :ios, "10.0"

  s.dependency 'React-Core'
end
