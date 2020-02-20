<template>
  <v-card tile elevation="1">
    <v-card-title>Lot Number: {{ lot.number }}</v-card-title>
    <v-card-text>
      <div class="subtitle-1">Status: {{ lot.status }}</div>
      <div class="grey--text">Reagent: {{ lot.reagent.name }}</div>
      <div>
        <a target="_blank" :href="lot.link">{{ lot.link }}</a>
      </div>
    </v-card-text>

    <v-divider class="mx-4" />

    <v-list dense flat>
      <v-list-item v-if="lot.requestedAt">
        <v-list-item-icon>
          <v-icon color="blue">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Requested ${new Date(lot.requestedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="lot.requestedBy">{{ `by ${lot.requestedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="lot.approvedAt">
        <v-list-item-icon>
          <v-icon color="purple">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Approved ${new Date(lot.approvedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="lot.approvedBy">{{ `by ${lot.approvedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="lot.orderedAt">
        <v-list-item-icon>
          <v-icon color="green">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Ordered ${new Date(lot.orderedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="lot.orderedBy">{{ `by ${lot.orderedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="lot.receivedAt">
        <v-list-item-icon>
          <v-icon color="orange">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Received ${new Date(lot.receivedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="lot.receivedBy">{{ `by ${lot.receivedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="lot.finishedAt">
        <v-list-item-icon>
          <v-icon color="red">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Finished ${new Date(lot.finishedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="lot.finishedBy">{{ `by ${lot.finishedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mx-4" />

    <v-card-subtitle v-if="conjugates && conjugates.length > 0">Conjugates</v-card-subtitle>

    <v-list dense flat two-line>
      <v-list-item v-for="conjugate in conjugates" :key="conjugate.id">
        <v-list-item-icon>
          <v-icon>mdi-set-center</v-icon>
        </v-list-item-icon>
        <v-list-item-content :class="conjugate.isDeleted && 'deleted'">
          <v-list-item-title>
            {{ conjugate.tag.name + conjugate.tag.mw }} by {{ conjugate.user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-row>
              <v-col>Tube: {{ conjugate.tubeNumber }}</v-col>
              <v-col>Concentration: {{ conjugate.concentration }}</v-col>
            </v-row>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                :to="{
                  name: 'main-group-conjugates-edit',
                  params: {
                    groupId: groupId,
                    id: conjugate.id,
                  },
                }"
              >
                <v-icon color="grey">mdi-pencil-outline</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-lots-edit',
          params: {
            groupId: groupId,
            id: lot.id,
          },
        }"
      >
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { lotModule } from "@/modules/lot";

@Component
export default class LotView extends Vue {
  readonly lotContext = lotModule.context(this.$store);

  @Prop(Number) readonly groupId!: number;
  @Prop(Object) readonly lot!: LotDto;

  conjugates: ConjugateDto[] = [];

  async mounted() {
    this.conjugates = await this.lotContext.actions.getLotConjugates(this.lot.id);
  }
}
</script>

<style scoped>
.deleted {
  color: palevioletred;
}
</style>
