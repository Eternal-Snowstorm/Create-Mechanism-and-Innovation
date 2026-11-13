let { create } = event.getRecipes()

create.cutting([
	"3x kaleidoscope_cookery:raw_cut_small_meat",
	"minecraft:bone"
], [
	"1x minecraft:chicken"
]).id("kaleidoscopecookery_automation:chicken")

create.cutting([
	"3x kaleidoscope_cookery:raw_cut_small_meat",
	"minecraft:bone"
], [
	"1x minecraft:rabbit"
]).id("kaleidoscopecookery_automation:rabbit")

create.cutting([
	"3x kaleidoscope_cookery:cooked_cut_small_meat",
	"minecraft:bone"
], [
	"1x minecraft:cooked_chicken"
])

create.cutting([
	"3x kaleidoscope_cookery:cooked_cut_small_meat",
	"minecraft:bone"
], [
	"1x minecraft:cooked_rabbit"
])

create.cutting([
	"3x kaleidoscope_cookery:sashimi"
], [
	"1x minecraft:cod"
]).id("kaleidoscopecookery_automation:cod")

create.cutting([
	"3x kaleidoscope_cookery:sashimi"
], [
	"1x minecraft:salmon"
]).id("kaleidoscopecookery_automation:salmon")

create.cutting([
	"3x kaleidoscope_cookery:sashimi"
], [
	"1x minecraft:tropical_fish"
])

create.cutting([
	"3x minecraft:bone"
], [
	"1x minecraft:cod"
]).id("kaleidoscopecookery_automation:cooked_cod")

create.cutting([
	"3x minecraft:bone"
], [
	"1x minecraft:salmon"
]).id("kaleidoscopecookery_automation:cooked_salmon")

create.cutting([
	"3x kaleidoscope_cookery:raw_lamb_chops"
], [
	"1x minecraft:mutton"
]).id("kaleidoscopecookery_automation:raw_mutton")

create.cutting([
	"3x kaleidoscope_cookery:cooked_lamb_chops"
], [
	"1x minecraft:cooked_mutton"
])

create.cutting([
	"3x kaleidoscope_cookery:raw_cow_offal"
], [
	"1x minecraft:beef"
]).id("kaleidoscopecookery_automation:beff")

create.cutting([
	"3x kaleidoscope_cookery:cooked_cow_offal"
], [
	"1x minecraft:cooked_beef"
])

create.cutting([
	"3x kaleidoscope_cookery:raw_pork_belly"
], [
	"1x minecraft:porkchop"
]).id("kaleidoscopecookery_automation:porkchop")

create.cutting([
	"3x kaleidoscope_cookery:cooked_pork_belly"
], [
	"1x minecraft:cooked_porkchop"
])

create.cutting([
	"3x kaleidoscope_cookery:raw_noodles"
], [
	"1x #forge:dough"
]).id("kaleidoscopecookery_automation:raw_dough")

create.cutting([
	"3x kaleidoscope_nether:ham_slice"
], [
	"1x kaleidoscope_nether:ham"
])

create.cutting([
	"3x kaleidoscope_nether:ham_slice"
], [
	"1x farmersdelight:ham"
])

create.cutting([
	"2x kaleidoscope_end:chorus_seed"
], [
	"1x minecraft:chorus_fruit"
])