@settings.each do |setting|
    json.set! setting.setting do
        json.partial! 'api/settings/setting', setting: setting
    end
end
