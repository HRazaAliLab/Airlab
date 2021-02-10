// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Pool } = require("pg");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dJSON = require("dirty-json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mkdirp = require("mkdirp");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const R = require("rambda");

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
  const json = require(dataFolder + "validations.json");

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


// async function migrateClone() {
//   const input = await mysqlPool.query("SELECT * FROM tblClone");
//   for (row of input[0]) {
//     console.log(row);
//     if (row["groupId"] !== 2) {
//       continue;
//     }
//     const sql =
//       'INSERT INTO "clone"(id, group_id, created_by, protein_id, species_id, name, isotype, epitope, is_phospho, is_polyclonal, reactivity, application, is_archived, meta) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
//
//     let reactivity = row["cloReactivity"];
//     if (reactivity === "") {
//       reactivity = [];
//     } else {
//       reactivity = row["cloReactivity"]
//         .split(",")
//         .filter(item => item !== "")
//         .map(item => parseInt(item, 10))
//         .filter(item => !isNaN(item));
//       reactivity = R.uniq(reactivity);
//     }
//
//     let application = row["cloApplication"];
//     if (application === null || application.toString() === "") {
//       application = null;
//     } else {
//       application = application.toString();
//       application = JSON.parse(application);
//       application = JSON.stringify(application);
//     }
//
//     let meta = row["catchedInfo"];
//     if ([1903, 2332, 2340, 2376, 2176, 2597].includes(row["cloCloneId"])) {
//       meta = null;
//     }
//     if (meta === null || meta === "") {
//       meta = null;
//     } else {
//       meta = dJSON.parse(meta);
//       meta = JSON.stringify(meta);
//     }
//
//     let cloneName = row["cloName"];
//     if (cloneName === null) {
//       cloneName = "";
//     }
//
//     let speciesId = [0, 64].includes(row["cloSpeciesHost"]) ? null : row["cloSpeciesHost"];
//     if (speciesId === 37) {
//       speciesId = 22;
//     }
//
//     const values = [
//       row["cloCloneId"],
//       row["groupId"],
//       [0, 76].includes(row["createdBy"]) ? 5 : row["createdBy"],
//       [null, 0, 11111, 1111111].includes(row["cloProteinId"]) ? 1300 : row["cloProteinId"],
//       speciesId,
//       cloneName,
//       row["cloIsotype"],
//       row["cloBindingRegion"],
//       row["cloIsPhospho"],
//       row["cloIsPolyclonal"],
//       reactivity,
//       application,
//       row["deleted"] === null ? false : row["deleted"],
//       meta,
//     ];
//     await postgresPool.query(sql, values);
//   }
//   await postgresPool.query("SELECT setval('public.clone_id_seq', (SELECT MAX(id) FROM public.clone), true);");
// }
//
// async function migrateLot() {
//   const input = await mysqlPool.query("SELECT * FROM tblReagentInstance");
//   for (row of input[0]) {
//     console.log(row);
//
//     if (row["groupId"] !== 2) {
//       continue;
//     }
//
//     if ([0, 462, 707].includes(row["lotCloneId"])) {
//       continue;
//     }
//
//     const reagentId = row["reiComertialReagentId"];
//     if ([null, 11111].includes(reagentId)) {
//       continue;
//     }
//
//     const reagentInput = await mysqlPool.query(
//       `SELECT * FROM tblComertialReagent WHERE comComertialReagentId = ${reagentId}`
//     );
//     const reagentRow = reagentInput[0][0];
//
//     let name = reagentRow["comName"];
//     if (name === null) {
//       name = "";
//     }
//
//     const reference = reagentRow["comReference"];
//
//     let providerId = [0, 25, 11111].includes(reagentRow["comProviderId"]) ? null : reagentRow["comProviderId"];
//     if (providerId === 87) {
//       providerId = 86;
//     }
//     if (providerId === 97) {
//       providerId = 18;
//     }
//
//     let reagentMeta = reagentRow["catchedInfo"];
//     if (reagentMeta === null || reagentMeta === "") {
//       reagentMeta = null;
//     } else {
//       reagentMeta = dJSON.parse(reagentMeta);
//       reagentMeta = JSON.stringify(reagentMeta);
//     }
//
//     const sql =
//       'INSERT INTO "lot"(id, group_id, created_by, provider_id, clone_id, name, reference, requested_by, approved_by, ordered_by, received_by, finished_by, number, status, purpose, url, requested_at, approved_at, ordered_at, received_at, finished_at, is_archived, price, note, meta) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)';
//
//     let meta = row["catchedInfo"];
//     if (
//       [
//         1977,
//         2293,
//         2732,
//         3252,
//         3399,
//         3425,
//         3485,
//         3495,
//         3512,
//         3634,
//         3666,
//         3690,
//         3702,
//         3703,
//         3815,
//         3826,
//         3946,
//         3960,
//         3963,
//       ].includes(row["reiReagentInstanceId"])
//     ) {
//       meta = null;
//     }
//     if (meta === null || meta === "") {
//       meta = null;
//     } else {
//       meta = dJSON.parse(meta);
//     }
//
//     const price = meta && meta.price ? meta.price : null;
//     const note = meta && meta.note ? meta.note : meta && meta.ote ? meta.ote : null;
//     let status = 0;
//     switch (row["reiStatus"]) {
//       case "requested":
//         status = 0;
//         break;
//       case "approved":
//         status = 1;
//         break;
//       case "rejected":
//         status = 2;
//         break;
//       case "ordered":
//         status = 3;
//         break;
//       case "stock":
//         status = 4;
//         break;
//       case "finished":
//         status = 6;
//         break;
//     }
//     const isLow = row["tubIsLow"] === null ? false : row["tubIsLow"];
//     if (isLow && status === 4) {
//       status = 5;
//     }
//     if (row["tubFinishedBy"] && row["tubFinishedBy"] > 0) {
//       status = 6;
//     }
//
//     const values = [
//       row["reiReagentInstanceId"],
//       row["groupId"],
//       [0, 76].includes(row["createdBy"]) ? 5 : row["createdBy"],
//       providerId,
//       row["lotCloneId"],
//       name,
//       reference,
//       [0, 76, 90].includes(row["reiRequestedBy"]) ? null : row["reiRequestedBy"],
//       [0, 76, 90].includes(row["reiApprovedBy"]) ? null : row["reiApprovedBy"],
//       [0, 76, 90].includes(row["reiOrderedBy"]) ? null : row["reiOrderedBy"],
//       [0, 76, 90].includes(row["reiReceivedBy"]) ? null : row["reiReceivedBy"],
//       [0, 76, 90].includes(row["tubFinishedBy"]) ? null : row["tubFinishedBy"],
//       row["lotNumber"],
//       status,
//       row["reiPurpose"],
//       row["lotDataSheetLink"] === "0" ? null : row["lotDataSheetLink"],
//       row["reiRequestedAt"] === "" || row["reiRequestedAt"] === null || row["reiRequestedAt"] === "0"
//         ? null
//         : row["reiRequestedAt"].replace("0000", "").trim(),
//       row["reiApprovedAt"] === "" || row["reiApprovedAt"] === null || row["reiApprovedAt"] === "0"
//         ? null
//         : row["reiApprovedAt"].replace("0000", "").trim(),
//       row["reiOrderedAt"] === "" || row["reiOrderedAt"] === null || row["reiOrderedAt"] === "0"
//         ? null
//         : row["reiOrderedAt"].replace("0000", "").trim(),
//       row["reiReceivedAt"] === "" || row["reiReceivedAt"] === null || row["reiReceivedAt"] === "0"
//         ? null
//         : row["reiReceivedAt"].replace("0000", "").trim(),
//       row["tubFinishedAt"] === "" || row["tubFinishedAt"] === null || row["tubFinishedAt"] === "0"
//         ? null
//         : row["tubFinishedAt"].replace("0000", "").trim(),
//       row["deleted"] === null ? false : row["deleted"],
//       price,
//       note,
//       reagentMeta,
//     ];
//     await postgresPool.query(sql, values);
//   }
//   await postgresPool.query("SELECT setval('public.lot_id_seq', (SELECT MAX(id) FROM public.lot), true);");
// }
//
// async function migrateConjugate() {
//   const input = await mysqlPool.query("SELECT * FROM tblLabeledAntibody");
//   for (row of input[0]) {
//     console.log(row);
//
//     if (row["groupId"] !== 2) {
//       continue;
//     }
//
//     if ([965, 1154, 1286].includes(row["labLotId"])) {
//       continue;
//     }
//
//     const sql =
//       'INSERT INTO "conjugate"(id, group_id, created_by, labeled_by, finished_by, lot_id, tag_id, status, tube_number, concentration, is_archived, description, created_at, finished_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
//
//     let status = row["tubIsLow"] !== 0 ? 1 : 0;
//     if (row["tubFinishedBy"] > 0) {
//       status = 2;
//     }
//
//     const dateOfLabeling =
//       row["labDateOfLabeling"] === "" || row["labDateOfLabeling"] === null || row["labDateOfLabeling"] === "0"
//         ? new Date().toISOString()
//         : row["labDateOfLabeling"]
//             .replace("0000", "")
//             .replace("0100", "")
//             .replace("0200", "")
//             .trim();
//
//     let concentration = row["labConcentration"] ? row["labConcentration"] : null;
//     if (concentration === "m" || concentration === "-" || concentration === "?") {
//       concentration = null;
//     }
//     if (concentration !== null) {
//       try {
//         concentration = Number(
//           concentration
//             .replace("mg/ml", "")
//             .replace("mg/mL", "")
//             .replace("µg/ml", "")
//             .replace("Âµg/ml", "")
//             .replace("Âµg/mL", "")
//             .replace("ug", "")
//             .trim()
//         );
//       } catch (e) {
//         concentration = null;
//       }
//     }
//     if (concentration === NaN) {
//       concentration = null;
//     }
//
//     const description =
//       row["catchedInfo"] === 0 || row["catchedInfo"] === "0" || row["catchedInfo"] === "" ? null : row["catchedInfo"];
//
//     let labeledBy = [0, "HJ", "FP", "BB", "", null].includes(row["labContributorId"]) ? null : row["labContributorId"];
//     if (labeledBy) {
//       labeledBy = Number(labeledBy);
//       const memberInput = await postgresPool.query(`SELECT * FROM member WHERE user_id=${labeledBy}`);
//       if (memberInput.rows.length > 0) {
//         const row = memberInput.rows[0];
//         labeledBy = row["id"];
//       } else {
//         labeledBy = null;
//       }
//     }
//
//     let finishedBy = [0].includes(row["tubFinishedBy"]) ? null : row["tubFinishedBy"];
//     if (finishedBy) {
//       finishedBy = Number(finishedBy);
//       const memberInput = await postgresPool.query(`SELECT * FROM member WHERE id=${finishedBy}`);
//       if (memberInput.rows.length > 0) {
//         const row = memberInput.rows[0];
//         finishedBy = row["id"];
//       } else {
//         finishedBy = null;
//       }
//     }
//
//     const values = [
//       row["labLabeledAntibodyId"],
//       row["groupId"],
//       [0].includes(row["createdBy"]) ? 5 : row["createdBy"],
//       labeledBy,
//       finishedBy,
//       row["labLotId"],
//       row["labTagId"],
//       status,
//       row["labBBTubeNumber"],
//       concentration,
//       row["deleted"],
//       description,
//       dateOfLabeling,
//       row["tubFinishedAt"] === "" || row["tubFinishedAt"] === null || row["tubFinishedAt"] === "0"
//         ? null
//         : row["tubFinishedAt"].replace("0000", "").trim(),
//     ];
//     await postgresPool.query(sql, values);
//   }
//   await postgresPool.query("SELECT setval('public.conjugate_id_seq', (SELECT MAX(id) FROM public.conjugate), true);");
// }
//
// async function migratePanel() {
//   const input = await mysqlPool.query("SELECT * FROM tblPanel");
//   for (row of input[0]) {
//     console.log(row);
//     if (row["groupId"] !== 2) {
//       continue;
//     }
//     const sql =
//       'INSERT INTO "panel"(id, group_id, created_by, name, description, is_fluorophore, is_locked, application, is_archived) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
//
//     const panelId = row["panPanelId"];
//
//     let details = row["panDetails"];
//     if ([538, 649, 661].includes(row["panPanelId"])) {
//       details = null;
//     }
//     if (details === null || details === "") {
//       details = null;
//     } else {
//       details = dJSON.parse(details);
//     }
//
//     const values = [
//       panelId,
//       row["groupId"],
//       row["createdBy"],
//       row["panName"] !== null ? row["panName"].toString() : null,
//       row["panDescription"],
//       row["panFluor"] === null ? false : row["panFluor"],
//       row["panIsProduction"] === null ? false : row["panIsProduction"],
//       row["panApplication"],
//       row["deleted"] === null ? false : row["deleted"],
//     ];
//     await postgresPool.query(sql, values);
//
//     if (details) {
//       const elementSql =
//         'INSERT INTO "panel_element"(panel_id, conjugate_id, dilution_type, concentration) VALUES($1, $2, $3, $4)';
//
//       for (const item of details) {
//         if (item.hasOwnProperty("plaLabeledAntibodyId")) {
//           const conjugateId = Number(item["plaLabeledAntibodyId"]);
//           const dilutionType = item["dilutionType"] ? Number(item["dilutionType"]) : 0;
//           const concentration = item["plaActualConc"] ? Number(item["plaActualConc"]) : null;
//           const elementValues = [panelId, conjugateId, dilutionType, concentration];
//           try {
//             await postgresPool.query(elementSql, elementValues);
//           } catch (e) {
//             console.log(e.message + ": " + details);
//           }
//         }
//       }
//     }
//   }
//   await postgresPool.query("SELECT setval('public.panel_id_seq', (SELECT MAX(id) FROM public.panel), true);");
// }
//
// async function migrateValidation() {
//   const input = await postgresPool.query("SELECT * FROM clone");
//   for (row of input.rows) {
//     // console.log(row);
//     const sql =
//       'INSERT INTO "validation"(group_id, created_by, clone_id, lot_id, conjugate_id, species_id, file_id, application, positive_control, negative_control, incubation_conditions, concentration, concentration_unit, tissue, fixation, fixation_notes, notes, status, antigen_retrieval_type, antigen_retrieval_time, antigen_retrieval_temperature, saponin, saponin_concentration, methanol_treatment, methanol_treatment_concentration, surface_staining, surface_staining_concentration, meta, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) RETURNING *';
//
//     if (!row["meta"]) {
//       continue;
//     }
//
//     for (item of row["meta"]) {
//       console.log(item);
//
//       if (item["app"] === undefined) {
//         continue;
//       }
//
//       let saponin = null;
//       if (item["saponin"] === "0") {
//         saponin = true;
//       } else if (item["saponin"] === "1") {
//         saponin = false;
//       }
//
//       let methanolTreatment = null;
//       if (item["metoh"] === "0") {
//         methanolTreatment = true;
//       } else if (item["metoh"] === "1") {
//         methanolTreatment = false;
//       }
//
//       let surfaceStaining = null;
//       if (item["surface"] === "0") {
//         surfaceStaining = true;
//       } else if (item["surface"] === "1") {
//         surfaceStaining = false;
//       }
//
//       let createdAt = "now()";
//       if (item["date"]) {
//         const date = new Date(item["date"].replace("0000", "").trim());
//         createdAt = date.toISOString();
//       }
//
//       let createdBy = null;
//       if (item["personId"]) {
//         const member = await postgresPool.query(
//           `SELECT * FROM member WHERE group_id=${row["group_id"]} AND user_id=${Number(item["personId"])}`
//         );
//         createdBy = member.rows[0].id;
//       }
//       if (!createdBy) {
//         createdBy = row["created_by"];
//       }
//
//       const values = [
//         row["group_id"],
//         createdBy,
//         row["id"],
//         item["lot"],
//         item["conjugate"],
//         item["speciesTested"],
//         ["undefined"].includes(item["file"]) ? null : item["file"],
//         item["app"],
//         item["sample"],
//         item["negSample"],
//         item["incConditions"],
//         item["abConc"],
//         item["concUnitType"],
//         item["tissue"],
//         item["fixation"],
//         item["fixationNotes"],
//         item["note"],
//         item["val"],
//         item["antigenRetrievalType"],
//         item["antigenRetrievalTime"],
//         item["antigenRetrievalTemp"],
//         saponin,
//         item["saponinConc"],
//         methanolTreatment,
//         item["metohConc"],
//         surfaceStaining,
//         item["surfaceConc"],
//         item,
//         createdAt,
//       ];
//       await postgresPool.query(sql, values);
//     }
//   }
//   await postgresPool.query("SELECT setval('public.validation_id_seq', (SELECT MAX(id) FROM public.validation), true);");
// }
//
// async function migrateValidationFile() {
//   const input = await mysqlPool.query("SELECT * FROM tblFile");
//   for (row of input[0]) {
//     console.log(row);
//     if (row["groupId"] !== 2) {
//       continue;
//     }
//
//     const sql =
//       'INSERT INTO "validation_file"(id, validation_id, created_by, name, extension, size, hash) VALUES($1, $2, $3, $4, $5, $6, $7)';
//
//     const name =
//       row["catchedInfo"] === "" || row["catchedInfo"] === null
//         ? null
//         : row["catchedInfo"].replace("||", "|").split("|")[0];
//     const size =
//       row["catchedInfo"] === "" || row["catchedInfo"] === null
//         ? null
//         : row["catchedInfo"].replace("||", "|").split("|")[1];
//
//     const validation = await postgresPool.query(`SELECT * FROM validation WHERE file_id=${row["filFileId"]}`);
//     if (!validation.rows[0]) {
//       console.log("Validation not found: ", row);
//       continue;
//     }
//
//     const values = [
//       row["filFileId"],
//       validation.rows[0].id,
//       row["createdBy"],
//       name,
//       row["filExtension"],
//       size,
//       row["filHash"],
//     ];
//     await postgresPool.query(sql, values);
//   }
//   await postgresPool.query(
//     "SELECT setval('public.validation_file_id_seq', (SELECT MAX(id) FROM public.validation_file), true);"
//   );
// }
//
// async function downloadFiles() {
//   const input = await postgresPool.query("SELECT * FROM validation_file");
//
//   const bucketName = "bblab_airlab_files";
//   const storage = new Storage({ keyFilename: "/home/anton/Documents/key.json", projectId: "api-project-209144424908" });
//   const bucket = await storage.bucket(bucketName);
//
//   // const [files] = await storage.bucket(bucketName).getFiles();
//   // files.forEach(async file => {
//   //   console.log(file.name);
//   // });
//
//   for (row of input.rows) {
//     const source = row["hash"].replace("_", "/") + "." + row["extension"];
//     const destinationDir = "/home/anton/Downloads/airlab/uploads/validation/" + row["validation_id"] + "/";
//     const destination = destinationDir + row["hash"] + "." + row["extension"];
//     let file = await bucket.file("files/" + source);
//     let exists = await file.exists();
//     if (exists[0]) {
//       if (!fs.existsSync(destinationDir)) {
//         mkdirp.sync(destinationDir);
//       }
//       await file.download({
//         // The path to which the file should be downloaded, e.g. "./file.txt"
//         destination: destination,
//       });
//     } else {
//       file = await bucket.file("temp/" + source);
//       exists = await file.exists();
//       if (exists[0]) {
//         if (!fs.existsSync(destinationDir)) {
//           mkdirp.sync(destinationDir);
//         }
//         await file.download({
//           // The path to which the file should be downloaded, e.g. "./file.txt"
//           destination: destination,
//         });
//       }
//     }
//     if (!exists[0]) {
//       console.log("Missing: ", row);
//     }
//   }
// }

async function migrate() {
  await restoreMember();
  await restoreProtein();
  await restoreClone();
  await restoreLot();
  await restoreConjugate();
  await restorePanel();
  await restorePanelElement();
  await restoreValidation();

  // await postgresPool.query(
  //   "SELECT 'SELECT setval(''public.' || c.relname || ''',' || ' (SELECT MAX(ID) FROM PUBLIC.' || REPLACE(c.relname,'_id_seq','') || '), true);' FROM pg_class c WHERE c.relkind = 'S' ORDER BY C.RELNAME;"
  // );
}

migrate().then(() => {
  console.log("Done.");
});
