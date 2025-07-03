declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"games": {
"1v1lol.md": {
	id: "1v1lol.md";
  slug: "1v1lol";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"1v1soccerio.md": {
	id: "1v1soccerio.md";
  slug: "1v1soccerio";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"2048-drop.md": {
	id: "2048-drop.md";
  slug: "2048-drop";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"2048-italian-brainrot.md": {
	id: "2048-italian-brainrot.md";
  slug: "2048-italian-brainrot";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"2048.md": {
	id: "2048.md";
  slug: "2048";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"age-of-war.md": {
	id: "age-of-war.md";
  slug: "age-of-war";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"arcade-volley.md": {
	id: "arcade-volley.md";
  slug: "arcade-volley";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"astro-robot-clicker.md": {
	id: "astro-robot-clicker.md";
  slug: "astro-robot-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"basket-random.md": {
	id: "basket-random.md";
  slug: "basket-random";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"basketball-stars.md": {
	id: "basketball-stars.md";
  slug: "basketball-stars";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"battle-karts.md": {
	id: "battle-karts.md";
  slug: "battle-karts";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"bike-xtreme.md": {
	id: "bike-xtreme.md";
  slug: "bike-xtreme";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"bitlife.md": {
	id: "bitlife.md";
  slug: "bitlife";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"block-blast-3d.md": {
	id: "block-blast-3d.md";
  slug: "block-blast-3d";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"block-slide.md": {
	id: "block-slide.md";
  slug: "block-slide";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"blocky-hunter.md": {
	id: "blocky-hunter.md";
  slug: "blocky-hunter";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"blocky-overtake-x.md": {
	id: "blocky-overtake-x.md";
  slug: "blocky-overtake-x";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"bombardino-crocodilo-clicker.md": {
	id: "bombardino-crocodilo-clicker.md";
  slug: "bombardino-crocodilo-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"bottle-jump.md": {
	id: "bottle-jump.md";
  slug: "bottle-jump";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"brain-lines.md": {
	id: "brain-lines.md";
  slug: "brain-lines";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"breakout-racing.md": {
	id: "breakout-racing.md";
  slug: "breakout-racing";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"bricky-blast.md": {
	id: "bricky-blast.md";
  slug: "bricky-blast";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"bricky-break.md": {
	id: "bricky-break.md";
  slug: "bricky-break";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"chicken-jockey-clicker.md": {
	id: "chicken-jockey-clicker.md";
  slug: "chicken-jockey-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"chicken-jockey-combat.md": {
	id: "chicken-jockey-combat.md";
  slug: "chicken-jockey-combat";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"chill-clicker.md": {
	id: "chill-clicker.md";
  slug: "chill-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"chill-girl-clicker.md": {
	id: "chill-girl-clicker.md";
  slug: "chill-girl-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"chill-guy-clicker-3d.md": {
	id: "chill-guy-clicker-3d.md";
  slug: "chill-guy-clicker-3d";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"chill-guy-clicker.md": {
	id: "chill-guy-clicker.md";
  slug: "chill-guy-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"color-rush.md": {
	id: "color-rush.md";
  slug: "color-rush";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"cookie-clicker.md": {
	id: "cookie-clicker.md";
  slug: "cookie-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"crazy-animal-city.md": {
	id: "crazy-animal-city.md";
  slug: "crazy-animal-city";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"crazy-bull-city.md": {
	id: "crazy-bull-city.md";
  slug: "crazy-bull-city";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"crazy-mouse-battle.md": {
	id: "crazy-mouse-battle.md";
  slug: "crazy-mouse-battle";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"crossy-road.md": {
	id: "crossy-road.md";
  slug: "crossy-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"cuby-road-halloween.md": {
	id: "cuby-road-halloween.md";
  slug: "cuby-road-halloween";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"cuby-road.md": {
	id: "cuby-road.md";
  slug: "cuby-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"curve-rush.md": {
	id: "curve-rush.md";
  slug: "curve-rush";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"dark-loop.md": {
	id: "dark-loop.md";
  slug: "dark-loop";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"dino-dash-3d.md": {
	id: "dino-dash-3d.md";
  slug: "dino-dash-3d";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"doom-rider.md": {
	id: "doom-rider.md";
  slug: "doom-rider";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"drift-boss.md": {
	id: "drift-boss.md";
  slug: "drift-boss";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"drift-hunters.md": {
	id: "drift-hunters.md";
  slug: "drift-hunters";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"drift-road.md": {
	id: "drift-road.md";
  slug: "drift-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"drive-mad.md": {
	id: "drive-mad.md";
  slug: "drive-mad";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"duck-clicker.md": {
	id: "duck-clicker.md";
  slug: "duck-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"duck-life.md": {
	id: "duck-life.md";
  slug: "duck-life";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"egg-race.md": {
	id: "egg-race.md";
  slug: "egg-race";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"eggy-car.md": {
	id: "eggy-car.md";
  slug: "eggy-car";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"escape-jump.md": {
	id: "escape-jump.md";
  slug: "escape-jump";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"escape-road-2.md": {
	id: "escape-road-2.md";
  slug: "escape-road-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"escape-road-city-2.md": {
	id: "escape-road-city-2.md";
  slug: "escape-road-city-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"escape-road-city.md": {
	id: "escape-road-city.md";
  slug: "escape-road-city";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"escape-road-halloween.md": {
	id: "escape-road-halloween.md";
  slug: "escape-road-halloween";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"escape-road-winter.md": {
	id: "escape-road-winter.md";
  slug: "escape-road-winter";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"escape-road.md": {
	id: "escape-road.md";
  slug: "escape-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"escape-vehicles.md": {
	id: "escape-vehicles.md";
  slug: "escape-vehicles";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"fall-flat-battle.md": {
	id: "fall-flat-battle.md";
  slug: "fall-flat-battle";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"fire-flush.md": {
	id: "fire-flush.md";
  slug: "fire-flush";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"fireboy-and-watergirl.md": {
	id: "fireboy-and-watergirl.md";
  slug: "fireboy-and-watergirl";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"flying-kong.md": {
	id: "flying-kong.md";
  slug: "flying-kong";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"forest-mouse.md": {
	id: "forest-mouse.md";
  slug: "forest-mouse";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"fury-chase.md": {
	id: "fury-chase.md";
  slug: "fury-chase";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"geoguessr.md": {
	id: "geoguessr.md";
  slug: "geoguessr";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"geometry-dash.md": {
	id: "geometry-dash.md";
  slug: "geometry-dash";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"geotastic.md": {
	id: "geotastic.md";
  slug: "geotastic";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"globe-guesser.md": {
	id: "globe-guesser.md";
  slug: "globe-guesser";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"god-simulator.md": {
	id: "god-simulator.md";
  slug: "god-simulator";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"golf-hit.md": {
	id: "golf-hit.md";
  slug: "golf-hit";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"gun-mayhem.md": {
	id: "gun-mayhem.md";
  slug: "gun-mayhem";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"head-basketball.md": {
	id: "head-basketball.md";
  slug: "head-basketball";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"head-soccer-2024.md": {
	id: "head-soccer-2024.md";
  slug: "head-soccer-2024";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"highway-heat.md": {
	id: "highway-heat.md";
  slug: "highway-heat";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"hill-climb-race.md": {
	id: "hill-climb-race.md";
  slug: "hill-climb-race";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"hockey-random.md": {
	id: "hockey-random.md";
  slug: "hockey-random";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"idle-gold-miner.md": {
	id: "idle-gold-miner.md";
  slug: "idle-gold-miner";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"italian-brainrot-clicker-2.md": {
	id: "italian-brainrot-clicker-2.md";
  slug: "italian-brainrot-clicker-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"jelly-hop.md": {
	id: "jelly-hop.md";
  slug: "jelly-hop";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"jetski-race.md": {
	id: "jetski-race.md";
  slug: "jetski-race";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"kitten-defense.md": {
	id: "kitten-defense.md";
  slug: "kitten-defense";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"knock-balls.md": {
	id: "knock-balls.md";
  slug: "knock-balls";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"kong-adventure.md": {
	id: "kong-adventure.md";
  slug: "kong-adventure";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"krunker.md": {
	id: "krunker.md";
  slug: "krunker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"loop-breakout.md": {
	id: "loop-breakout.md";
  slug: "loop-breakout";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"mars-jump.md": {
	id: "mars-jump.md";
  slug: "mars-jump";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"mayhem-drive.md": {
	id: "mayhem-drive.md";
  slug: "mayhem-drive";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"merge-brainrot.md": {
	id: "merge-brainrot.md";
  slug: "merge-brainrot";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"minecraft.md": {
	id: "minecraft.md";
  slug: "minecraft";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"monkey-mart.md": {
	id: "monkey-mart.md";
  slug: "monkey-mart";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"moto-x3m.md": {
	id: "moto-x3m.md";
  slug: "moto-x3m";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"mountain-road.md": {
	id: "mountain-road.md";
  slug: "mountain-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"narrow-one.md": {
	id: "narrow-one.md";
  slug: "narrow-one";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"omnom-jump.md": {
	id: "omnom-jump.md";
  slug: "omnom-jump";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"openguessr.md": {
	id: "openguessr.md";
  slug: "openguessr";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"orbit-dash.md": {
	id: "orbit-dash.md";
  slug: "orbit-dash";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"overtake-x.md": {
	id: "overtake-x.md";
  slug: "overtake-x";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"pacman-30th-anniversary.md": {
	id: "pacman-30th-anniversary.md";
  slug: "pacman-30th-anniversary";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"papas-freezeria.md": {
	id: "papas-freezeria.md";
  slug: "papas-freezeria";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"paper-io.md": {
	id: "paper-io.md";
  slug: "paper-io";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"paper-minecraft.md": {
	id: "paper-minecraft.md";
  slug: "paper-minecraft";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"power-surfer.md": {
	id: "power-surfer.md";
  slug: "power-surfer";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"ragdoll-hit-stickman.md": {
	id: "ragdoll-hit-stickman.md";
  slug: "ragdoll-hit-stickman";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"ragdoll-playground.md": {
	id: "ragdoll-playground.md";
  slug: "ragdoll-playground";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"rebound-shooter.md": {
	id: "rebound-shooter.md";
  slug: "rebound-shooter";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"red-rush.md": {
	id: "red-rush.md";
  slug: "red-rush";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"retro-bowl.md": {
	id: "retro-bowl.md";
  slug: "retro-bowl";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"run-3.md": {
	id: "run-3.md";
  slug: "run-3";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"run-3d.md": {
	id: "run-3d.md";
  slug: "run-3d";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"scary-wheels.md": {
	id: "scary-wheels.md";
  slug: "scary-wheels";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"shell-shockers.md": {
	id: "shell-shockers.md";
  slug: "shell-shockers";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"shooter-hero.md": {
	id: "shooter-hero.md";
  slug: "shooter-hero";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"shooter-sky.md": {
	id: "shooter-sky.md";
  slug: "shooter-sky";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"ski-frenzy.md": {
	id: "ski-frenzy.md";
  slug: "ski-frenzy";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"slope-2.md": {
	id: "slope-2.md";
  slug: "slope-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"slope-3.md": {
	id: "slope-3.md";
  slug: "slope-3";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"slope-cyber.md": {
	id: "slope-cyber.md";
  slug: "slope-cyber";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"slope-emoji-2.md": {
	id: "slope-emoji-2.md";
  slug: "slope-emoji-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"slope-emoji.md": {
	id: "slope-emoji.md";
  slug: "slope-emoji";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"slope-gear.md": {
	id: "slope-gear.md";
  slug: "slope-gear";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"slope-legacy.md": {
	id: "slope-legacy.md";
  slug: "slope-legacy";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"slope-snowball.md": {
	id: "slope-snowball.md";
  slug: "slope-snowball";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"slope-spooky.md": {
	id: "slope-spooky.md";
  slug: "slope-spooky";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"slope.md": {
	id: "slope.md";
  slug: "slope";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"smash-karts.md": {
	id: "smash-karts.md";
  slug: "smash-karts";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"smashy-road.md": {
	id: "smashy-road.md";
  slug: "smashy-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"snake-arena.md": {
	id: "snake-arena.md";
  slug: "snake-arena";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"snow-rider-3d.md": {
	id: "snow-rider-3d.md";
  slug: "snow-rider-3d";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"snow-road-3d.md": {
	id: "snow-road-3d.md";
  slug: "snow-road-3d";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"snow-road.md": {
	id: "snow-road.md";
  slug: "snow-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"space-road.md": {
	id: "space-road.md";
  slug: "space-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"spear-warzone.md": {
	id: "spear-warzone.md";
  slug: "spear-warzone";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"speed-legends.md": {
	id: "speed-legends.md";
  slug: "speed-legends";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"speed-shooter.md": {
	id: "speed-shooter.md";
  slug: "speed-shooter";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"sprunki-clicker.md": {
	id: "sprunki-clicker.md";
  slug: "sprunki-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"sprunki-jump.md": {
	id: "sprunki-jump.md";
  slug: "sprunki-jump";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"sprunki.md": {
	id: "sprunki.md";
  slug: "sprunki";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"stellar-burner.md": {
	id: "stellar-burner.md";
  slug: "stellar-burner";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"stickman-hook.md": {
	id: "stickman-hook.md";
  slug: "stickman-hook";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"stickman-racing.md": {
	id: "stickman-racing.md";
  slug: "stickman-racing";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"street-wheelie.md": {
	id: "street-wheelie.md";
  slug: "street-wheelie";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"subway-santa.md": {
	id: "subway-santa.md";
  slug: "subway-santa";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"subway-surfers.md": {
	id: "subway-surfers.md";
  slug: "subway-surfers";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"sugar-sugar.md": {
	id: "sugar-sugar.md";
  slug: "sugar-sugar";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"suika-game.md": {
	id: "suika-game.md";
  slug: "suika-game";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"supermarket-master.md": {
	id: "supermarket-master.md";
  slug: "supermarket-master";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tap-road-beat.md": {
	id: "tap-road-beat.md";
  slug: "tap-road-beat";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tap-road.md": {
	id: "tap-road.md";
  slug: "tap-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tap-rush.md": {
	id: "tap-rush.md";
  slug: "tap-rush";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"temple-run-2.md": {
	id: "temple-run-2.md";
  slug: "temple-run-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"temple-runner.md": {
	id: "temple-runner.md";
  slug: "temple-runner";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tetris.md": {
	id: "tetris.md";
  slug: "tetris";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tiny-fishing.md": {
	id: "tiny-fishing.md";
  slug: "tiny-fishing";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"titans-clicker.md": {
	id: "titans-clicker.md";
  slug: "titans-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"town-run.md": {
	id: "town-run.md";
  slug: "town-run";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"traffic-jam-3d.md": {
	id: "traffic-jam-3d.md";
  slug: "traffic-jam-3d";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"traffic-rally.md": {
	id: "traffic-rally.md";
  slug: "traffic-rally";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"traffic-rider.md": {
	id: "traffic-rider.md";
  slug: "traffic-rider";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"traffic-road.md": {
	id: "traffic-road.md";
  slug: "traffic-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tralalero-tralala-clicker.md": {
	id: "tralalero-tralala-clicker.md";
  slug: "tralalero-tralala-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"trap-the-cat.md": {
	id: "trap-the-cat.md";
  slug: "trap-the-cat";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tube-fall.md": {
	id: "tube-fall.md";
  slug: "tube-fall";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tung-sahur-clicker.md": {
	id: "tung-sahur-clicker.md";
  slug: "tung-sahur-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tung-sahur-horror.md": {
	id: "tung-sahur-horror.md";
  slug: "tung-sahur-horror";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tunnel-ball.md": {
	id: "tunnel-ball.md";
  slug: "tunnel-ball";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"turbo-street.md": {
	id: "turbo-street.md";
  slug: "turbo-street";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"unchill-guy-clicker.md": {
	id: "unchill-guy-clicker.md";
  slug: "unchill-guy-clicker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"venge-io.md": {
	id: "venge-io.md";
  slug: "venge-io";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"vex-3.md": {
	id: "vex-3.md";
  slug: "vex-3";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"wacky-flip.md": {
	id: "wacky-flip.md";
  slug: "wacky-flip";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"wacky-nursery-2.md": {
	id: "wacky-nursery-2.md";
  slug: "wacky-nursery-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"wacky-nursery.md": {
	id: "wacky-nursery.md";
  slug: "wacky-nursery";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"wave-road.md": {
	id: "wave-road.md";
  slug: "wave-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"white-horizon.md": {
	id: "white-horizon.md";
  slug: "white-horizon";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"wing-smash.md": {
	id: "wing-smash.md";
  slug: "wing-smash";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"world-geography-games.md": {
	id: "world-geography-games.md";
  slug: "world-geography-games";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"wyrmdash.md": {
	id: "wyrmdash.md";
  slug: "wyrmdash";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"ziggy-road.md": {
	id: "ziggy-road.md";
  slug: "ziggy-road";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"zombie-rising.md": {
	id: "zombie-rising.md";
  slug: "zombie-rising";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"zombie-strike.md": {
	id: "zombie-strike.md";
  slug: "zombie-strike";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
