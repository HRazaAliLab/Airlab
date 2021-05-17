// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Pool } = require("pg");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dJSON = require("dirty-json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mkdirp = require("mkdirp");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires

const dataFolder = "/home/anton/Downloads/airlab/";

const postgresPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "airlab",
  password: "changethis",
  port: 5432,
});

// const postgresPool = new Pool({
//   user: "postgres",
//   host: "130.60.24.75",
//   database: "airlab",
//   password: "",
//   port: 5432,
// });

async function restoreMember() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const json = require(dataFolder + "members.json");

  for (item of json) {
    if (item.groupId === 2) {
      const result = await postgresPool.query("SELECT * FROM member WHERE id=" + item.id);
      const exists = result.rowCount === 1;

      if (!exists) {
        console.log("Member: ", item);
        const sql =
          'INSERT INTO "member"(id, group_id, user_id, role, all_panels, is_active, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [
          item.id,
          item.groupId,
          item.userId,
          item.role,
          item.allPanels,
          item.isActive,
          item.createdAt,
          item.updatedAt,
        ];
        await postgresPool.query(sql, values);
      }
    }
  }
}

async function restoreProtein() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const json = require(dataFolder + "proteins.json");

  for (item of json) {
    if (item.groupId === 2) {
      const result = await postgresPool.query("SELECT * FROM protein WHERE id=" + item.id);
      const exists = result.rowCount === 1;

      if (!exists) {
        console.log("Protein: ", item);
        const sql =
          'INSERT INTO "protein"(id, group_id, created_by, name, description, meta, created_at) VALUES($1, $2, $3, $4, $5, $6, $7)';
        const values = [
          item.id,
          item.groupId,
          item.createdBy,
          item.name,
          item.description,
          item.meta,
          item.createdAt,
        ];
        await postgresPool.query(sql, values);
      }
    }
  }
}

async function restoreClone() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const json = require(dataFolder + "clones.json");

  for (item of json) {
    if (item.groupId === 2) {
      const result = await postgresPool.query("SELECT * FROM clone WHERE id=" + item.id);
      const exists = result.rowCount === 1;

      if (!exists) {
        console.log("Clone: ", item);
        const sql =
          'INSERT INTO "clone"(id, group_id, created_by, protein_id, species_id, name, isotype, epitope, is_phospho, is_polyclonal, reactivity, application, is_archived, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)';
        const values = [
          item.id,
          item.groupId,
          item.createdBy,
          item.proteinId,
          item.speciesId,
          item.name,
          item.isotype,
          item.epitope,
          item.isPhospho,
          item.isPolyclonal,
          item.reactivity,
          JSON.stringify(item.application),
          item.isArchived,
          item.createdAt,
          item.updatedAt,
        ];
        await postgresPool.query(sql, values);
      }
    }
  }
}

async function restoreClone() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const json = require(dataFolder + "clones.json");

  for (item of json) {
    if (item.groupId === 2) {
      const result = await postgresPool.query("SELECT * FROM clone WHERE id=" + item.id);
      const exists = result.rowCount === 1;

      if (!exists) {
        console.log("Clone: ", item);
        const sql =
          'INSERT INTO "clone"(id, group_id, created_by, protein_id, species_id, name, isotype, epitope, is_phospho, is_polyclonal, reactivity, application, is_archived, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)';
        const values = [
          item.id,
          item.groupId,
          item.createdBy,
          item.proteinId,
          item.speciesId,
          item.name,
          item.isotype,
          item.epitope,
          item.isPhospho,
          item.isPolyclonal,
          item.reactivity,
          JSON.stringify(item.application),
          item.isArchived,
          item.createdAt,
          item.updatedAt,
        ];
        await postgresPool.query(sql, values);
      }
    }
  }
}

async function restoreLot() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const json = require(dataFolder + "lots.json");
  for (item of json) {
    if (item.groupId === 2) {
      const result = await postgresPool.query("SELECT * FROM lot WHERE id=" + item.id);
      const exists = result.rowCount === 1;

      if (!exists) {
        console.log("Lot: ", item);
        const sql =
          'INSERT INTO "lot"(id, group_id, created_by, clone_id, provider_id, name, reference, requested_by, approved_by, ordered_by, received_by, finished_by, number, status, purpose, url, price, note, requested_at, approved_at, ordered_at, received_at, finished_at, is_archived, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)';
        const values = [
          item.id,
          item.groupId,
          item.createdBy,
          item.cloneId,
          item.providerId,
          item.name,
          item.reference,
          item.requestedBy,
          item.approvedBy,
          item.orderedBy,
          item.receivedBy,
          item.finishedBy,
          item.number,
          item.status,
          item.purpose,
          item.url,
          item.price,
          item.note,
          item.requestedAt,
          item.approvedAt,
          item.orderedAt,
          item.receivedAt,
          item.finishedAt,
          item.isArchived,
          item.createdAt,
          item.updatedAt,
        ];
        await postgresPool.query(sql, values);
      }
    }
  }
}

async function restoreConjugate() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const json = require(dataFolder + "conjugates.json");

  for (item of json) {
    if (item.groupId === 2) {
      const result = await postgresPool.query("SELECT * FROM conjugate WHERE id=" + item.id);
      const exists = result.rowCount === 1;

      if (!exists) {
        console.log("Conjugate: ", item);
        const sql =
          'INSERT INTO "conjugate"(id, group_id, created_by, lot_id, tag_id, labeled_by, finished_by, status, tube_number, concentration, description, is_archived, finished_at, created_at, updated_at, custom_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)';
        const values = [
          item.id,
          item.groupId,
          item.createdBy,
          item.lotId,
          item.tagId,
          item.labeledBy,
          item.finishedBy,
          item.status,
          item.tubeNumber,
          item.concentration,
          item.description,
          item.isArchived,
          item.finishedAt,
          item.createdAt,
          item.updatedAt,
          item.customId,
        ];
        await postgresPool.query(sql, values);
      }
    }
  }
}

async function restorePanel() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const json = require(dataFolder + "panels.json");

  for (item of json) {
    if (item.groupId === 2) {
      const result = await postgresPool.query("SELECT * FROM panel WHERE id=" + item.id);
      const exists = result.rowCount === 1;

      if (!exists) {
        console.log("Panel: ", item);
        const sql =
          'INSERT INTO "panel"(id, group_id, created_by, name, description, is_fluorophore, is_locked, application, is_archived, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
        const values = [
          item.id,
          item.groupId,
          item.createdBy,
          item.name,
          item.description,
          item.isFluorophore,
          item.isLocked,
          item.application,
          item.isArchived,
          item.createdAt,
          item.updatedAt,
        ];
        await postgresPool.query(sql, values);
      }
    }
  }
}

async function restorePanelElement() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const json = require(dataFolder + "panelElements.json");

  for (item of json) {
    const result = await postgresPool.query("SELECT * FROM panel_element WHERE id=" + item.id);
    const exists = result.rowCount === 1;

    if (!exists) {
      console.log("PanelElement: ", item);
      const sql =
        'INSERT INTO "panel_element"(id, panel_id, conjugate_id, dilution_type, concentration) VALUES($1, $2, $3, $4, $5)';
      const values = [
        item.id,
        item.panelId,
        item.conjugateId,
        item.dilutionType,
        item.concentration,
      ];
      try {
        await postgresPool.query(sql, values);
      } catch {
        console.log("Duplicate!");
      }
    }
  }
}

async function restoreValidation() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const json = require(dataFolder + "validation.json");

  for (item of json) {
    if (item.groupId === 2) {
      const result = await postgresPool.query("SELECT * FROM validation WHERE id=" + item.id);
      const exists = result.rowCount === 1;

      if (!exists) {
        console.log("Validation: ", item);
        const sql =
          'INSERT INTO "validation"(id, group_id, created_by, clone_id, lot_id, conjugate_id, species_id, application, positive_control, negative_control, incubation_conditions, concentration, concentration_unit, tissue, fixation, fixation_notes, notes, status, antigen_retrieval_type, antigen_retrieval_time, antigen_retrieval_temperature, saponin, saponin_concentration, methanol_treatment, methanol_treatment_concentration, surface_staining, surface_staining_concentration, meta, is_archived, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31)';
        const values = [
          item.id,
          item.groupId,
          item.createdBy,
          item.cloneId,
          item.lotId,
          item.conjugateId,
          item.speciesId,
          item.application,
          item.positiveControl,
          item.negativeControl,
          item.incubationConditions,
          item.concentration,
          item.concentrationUnit,
          item.tissue,
          item.fixation,
          item.fixationNotes,
          item.notes,
          item.status,
          item.antigenRetrievalType,
          item.antigenRetrievalTime,
          item.antigenRetrievalTemperature,
          item.saponin,
          item.saponinConcentration,
          item.methanolTreatment,
          item.methanolTreatmentConcentration,
          item.surfaceStaining,
          item.surfaceStainingConcentration,
          item.meta,
          item.isArchived,
          item.createdAt,
          item.updatedAt,
        ];
        await postgresPool.query(sql, values);
      }
    }
  }
}

async function restoreValidationFile() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const json = require(dataFolder + "validationFiles.json");

  for (item of json) {
    if (item.validation.groupId === 2) {
      const result = await postgresPool.query("SELECT * FROM validation_file WHERE id=" + item.id);
      const exists = result.rowCount === 1;

      if (!exists) {
        console.log("ValidationFile: ", item);
        const sql =
          'INSERT INTO "validation_file"(id, validation_id, created_by, hash, size, name, extension, description, meta, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [
          item.id,
          item.validationId,
          item.createdBy,
          item.hash,
          item.size,
          item.name,
          item.extension,
          item.description,
          item.meta,
          item.createdAt,
        ];
        await postgresPool.query(sql, values);
      }
    }
  }
}

async function migrate() {
  await restoreMember();
  await restoreProtein();
  await restoreClone();
  await restoreLot();
  await restoreConjugate();
  await restorePanel();
  await restorePanelElement();
  await restoreValidation();
  await restoreValidationFile();

  // await postgresPool.query(
  //   "SELECT 'SELECT setval(''public.' || c.relname || ''',' || ' (SELECT MAX(ID) FROM PUBLIC.' || REPLACE(c.relname,'_id_seq','') || '), true);' FROM pg_class c WHERE c.relkind = 'S' ORDER BY C.RELNAME;"
  // );
}

migrate().then(() => {
  console.log("Done.");
});
