require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Billbill
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # load use_cases folder
    config.autoload_paths += %W(
      #{config.root}/app/use_cases
    )
    config.eager_load_paths += %W(
      #{config.root}/app/use_cases
    )
  end
end
