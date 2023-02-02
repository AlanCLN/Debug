# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Card.delete_all
Replacement.delete_all
Setting.delete_all
User.delete_all

User.connection.execute('ALTER SEQUENCE users_id_seq RESTART WITH 1')
Card.connection.execute('ALTER SEQUENCE cards_id_seq RESTART WITH 1')
Replacement.connection.execute('ALTER SEQUENCE replacements_id_seq RESTART WITH 1')
Setting.connection.execute('ALTER SEQUENCE settings_id_seq RESTART WITH 1')

User.create({username: 'hamster', password: 'hamster'})
User.create({username: 'jameschow', password: 'gamerschoice22'})

Card.create({name: 'blue dragon thing',category: 'unkonwn'})
Card.create({name: 'black magician',category: 'cabinet'})
Card.create({name: 'exodia',category: 'unkonwn'})
Card.create({name: 'slifer',category: 'cabinet'})

Replacement.create({find: 'james chow',replace: 'big boss'})
Replacement.create({find: 'isaac wei',replace: 'app daddy'})
Replacement.create({find: 'richard dong',replace: 'lil shit'})
Replacement.create({find: 'alan ng',replace: 'medium shit'})
Replacement.create({find: 'raymond yang',replace: 'big shit'})

Setting.create({setting: 'tracking',value: 35})