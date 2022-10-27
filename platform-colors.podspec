require 'json'
pkg = JSON.parse(File.read('package.json'))

folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|

  s.name            = 'platform-colors'
  s.version         = pkg["version"]
  s.homepage        = pkg["homepage"]
  s.license         = pkg["license"]
  s.author          = { "Klarna" => "open.source@klarna.com" }
  s.summary         = pkg["description"]
  s.source          = { :git => pkg["repository"], :tag => "v#{s.version}" }
  s.source_files    = 'ios/*.{h,m,mm}'
  s.preserve_paths  = "**/*.js"
  s.requires_arc    = true
  s.platforms       = { :ios => "11.0" }

  s.dependency 'React-Core'

  # This guard prevent to install the dependencies when we run `pod install` in the old architecture.
  if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then
      s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
      s.pod_target_xcconfig    = {
          "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
          "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
      }

      s.dependency "React-Codegen"
      s.dependency "RCT-Folly"
      s.dependency "RCTRequired"
      s.dependency "RCTTypeSafety"
      s.dependency "ReactCommon/turbomodule/core"
  end
end
