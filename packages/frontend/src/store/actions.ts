import { Actions, Context } from "vuex-smart-module";
import { Store } from "vuex";
import { cloneModule } from "@/modules/clone";
import { conjugateModule } from "@/modules/conjugate";
import { groupModule } from "@/modules/group";
import { lotModule } from "@/modules/lot";
import { memberModule } from "@/modules/member";
import { panelModule } from "@/modules/panel";
import { proteinModule } from "@/modules/protein";
import { providerModule } from "@/modules/provider";
import { speciesModule } from "@/modules/species";
import { tagModule } from "@/modules/tag";
import { validationModule } from "@/modules/validation";

export class RootActions extends Actions {
  clone?: Context<typeof cloneModule>;
  conjugate?: Context<typeof conjugateModule>;
  group?: Context<typeof groupModule>;
  lot?: Context<typeof lotModule>;
  member?: Context<typeof memberModule>;
  panel?: Context<typeof panelModule>;
  protein?: Context<typeof proteinModule>;
  provider?: Context<typeof providerModule>;
  species?: Context<typeof speciesModule>;
  tag?: Context<typeof tagModule>;
  validation?: Context<typeof validationModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    this.clone = cloneModule.context(store);
    this.conjugate = conjugateModule.context(store);
    this.group = groupModule.context(store);
    this.lot = lotModule.context(store);
    this.member = memberModule.context(store);
    this.panel = panelModule.context(store);
    this.protein = proteinModule.context(store);
    this.provider = providerModule.context(store);
    this.species = speciesModule.context(store);
    this.tag = tagModule.context(store);
    this.validation = validationModule.context(store);
  }

  reset() {
    this.clone?.mutations.reset();
    this.conjugate?.mutations.reset();
    this.group?.mutations.reset();
    this.lot?.mutations.reset();
    this.member?.mutations.reset();
    this.panel?.mutations.reset();
    this.protein?.mutations.reset();
    this.provider?.mutations.reset();
    this.species?.mutations.reset();
    this.tag?.mutations.reset();
    this.validation?.mutations.reset();
  }
}
