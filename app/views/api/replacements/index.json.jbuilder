@replacements.each do |replacement|
  json.set! replacement.find do
    json.partial! 'api/replacements/replacement', replacement: replacement
  end
end