<template>
  <v-card tile elevation="1" class="mb-3">
    <v-card-title>Lot Number: {{ item.number }}</v-card-title>
    <v-card-text>
      <div class="subtitle-1">Status: {{ item.status }}</div>
      <div class="grey--text">Reagent: {{ item.reagent.name }}</div>
      <div>
        <a target="_blank" :href="item.link">{{ item.link }}</a>
      </div>
    </v-card-text>

    <v-divider class="mx-4" />

    <v-list dense flat>
      <v-list-item v-if="item.requestedAt">
        <v-list-item-icon>
          <v-icon color="blue">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Requested ${new Date(item.requestedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="item.requestedBy">{{ `by ${item.requestedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="item.approvedAt">
        <v-list-item-icon>
          <v-icon color="purple">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Approved ${new Date(item.approvedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="item.approvedBy">{{ `by ${item.approvedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="item.orderedAt">
        <v-list-item-icon>
          <v-icon color="green">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Ordered ${new Date(item.orderedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="item.orderedBy">{{ `by ${item.orderedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="item.receivedAt">
        <v-list-item-icon>
          <v-icon color="orange">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Received ${new Date(item.receivedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="item.receivedBy">{{ `by ${item.receivedBy}` }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="item.finishedAt">
        <v-list-item-icon>
          <v-icon color="red">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ `Finished ${new Date(item.finishedAt).toUTCString()}` }}</v-list-item-title>
          <v-list-item-subtitle v-if="item.finishedBy">{{ `by ${item.finishedBy}` }}</v-list-item-subtitle>
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
        <v-list-item-content :class="conjugate.isLow && 'low'">
          <v-list-item-title>
            <v-row>
              <v-col>Id: {{ conjugate.id }}</v-col>
              <v-col>Tube: {{ conjugate.tubeNumber }}</v-col>
              <v-col>Concentration: {{ conjugate.concentration }}</v-col>
            </v-row>
          </v-list-item-title>
          <v-list-item-subtitle v-if="conjugate.description"
            >Description: {{ conjugate.description }}</v-list-item-subtitle
          >
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
            id: item.id,
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

  @Prop(Number) groupId!: number;
  @Prop(Object) item!: LotDto;

  conjugates: ConjugateDto[] = [];

  async mounted() {
    this.conjugates = await this.lotContext.actions.getLotConjugates(this.item.id);
  }
}
</script>

<style scoped>
.low {
  color: palevioletred;
}
</style>
