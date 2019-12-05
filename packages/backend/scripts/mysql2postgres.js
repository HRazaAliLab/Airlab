const mysql = require("mysql2/promise");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Pool } = require("pg");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dJSON = require("dirty-json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Storage } = require("@google-cloud/storage");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mkdirp = require("mkdirp");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "pass",
  database: "labpad_new",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const postgresPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "airlab",
  password: "changethis",
  port: 5432,
});

async function migrateGroup() {
  const input = await mysqlPool.query("SELECT * FROM tblGroup");
  for (row of input[0]) {
    console.log(row);
    if (row["grpGroupId"] !== 2) {
      continue;
    }
    const sql = 'INSERT INTO "group"(id, name, institution, url, is_open) VALUES($1, $2, $3, $4, $5)';
    const values = [
      row["grpGroupId"],
      row["grpName"],
      row["grpInstitution"],
      row["grpUrl"],
      row["grpAcceptRequests"] ? row["grpAcceptRequests"] : false,
    ];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.group_id_seq', (SELECT MAX(id) FROM public.group), true);");
}

async function migrateUser() {
  const input = await mysqlPool.query("SELECT * FROM tblPerson");
  for (row of input[0]) {
    console.log(row);
    const sql = 'INSERT INTO "user"(id, name, email, password, is_active) VALUES($1, $2, $3, $4, $5)';
    const values = [
      row["perPersonId"],
      `${row["perName"]} ${row["perLastname"]}`,
      row["perEmail"],
      row["perPassword"],
      row["zetActive"],
    ];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.user_id_seq', (SELECT MAX(id) FROM public.user), true);");
}

async function migrateGroupUser() {
  const input = await mysqlPool.query("SELECT * FROM tblZGroupPerson");
  for (row of input[0]) {
    console.log(row);
    if (row["gpeGroupId"] !== 2) {
      continue;
    }
    const sql =
      'INSERT INTO "group_user"(id, group_id, user_id, role, activation_key, is_active, can_order, can_erase, can_finances, can_panels) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    const values = [
      row["gpeGroupPersonId"],
      [21].includes(row["gpeGroupId"]) ? 3 : row["gpeGroupId"],
      [777777777, 8, 52, 0].includes(row["gpePersonId"]) ? 292 : row["gpePersonId"],
      row["gpeRole"],
      row["zetActKey"],
      row["gpeActiveInGroup"] ? row["gpeActiveInGroup"] : false,
      row["gpeOrders"] ? row["gpeOrders"] : false,
      row["gpeErase"] ? row["gpeErase"] : false,
      row["gpeFinances"] ? row["gpeFinances"] : false,
      row["gpeAllPanels"] ? row["gpeAllPanels"] : false,
    ];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.group_user_id_seq', (SELECT MAX(id) FROM public.group_user), true);");
}

async function migrateSpecies() {
  const input = await mysqlPool.query("SELECT * FROM tblSpecies");
  for (row of input[0]) {
    if ([37].includes(row["spcSpeciesId"])) {
      continue;
    }
    console.log(row);
    const sql = 'INSERT INTO "species"(id, group_id, name, acronym) VALUES($1, $2, $3, $4)';
    const values = [row["spcSpeciesId"], 2, row["spcName"], row["spcAcronym"]];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.species_id_seq', (SELECT MAX(id) FROM public.species), true);");
}

async function migrateTag() {
  const input = await mysqlPool.query("SELECT * FROM tblTag");
  for (row of input[0]) {
    console.log(row);
    const sql = 'INSERT INTO "tag"(id, group_id, name, mw, is_fluorophore, is_metal) VALUES($1, $2, $3, $4, $5, $6)';
    const values = [
      row["tagTagId"],
      2,
      row["tagName"],
      row["tagMW"] !== "" ? row["tagMW"] : null,
      row["tagIsFluorphore"],
      row["tagIsMetal"],
    ];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.tag_id_seq', (SELECT MAX(id) FROM public.tag), true);");
}

async function migrateProvider() {
  const input = await mysqlPool.query("SELECT * FROM tblProvider");
  for (row of input[0]) {
    console.log(row);
    if ([87, 97].includes(row["proProviderId"])) {
      continue;
    }
    const sql = 'INSERT INTO "provider"(id, group_id, name) VALUES($1, $2, $3)';
    const values = [row["proProviderId"], 2, row["proName"]];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.provider_id_seq', (SELECT MAX(id) FROM public.provider), true);");
}

async function migrateReagent() {
  const input = await mysqlPool.query("SELECT * FROM tblComertialReagent");
  for (row of input[0]) {
    console.log(row);
    if (row["groupId"] !== 2) {
      continue;
    }
    let name = row["comName"];
    if (name === null) {
      name = "";
    }
    const sql =
      'INSERT INTO "reagent"(id, group_id, created_by, provider_id, name, reference, is_deleted, meta) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
    let providerId = [0, 25, 11111].includes(row["comProviderId"]) ? null : row["comProviderId"];
    if (providerId === 87) {
      providerId = 86;
    }
    if (providerId === 97) {
      providerId = 18;
    }

    let meta = row["catchedInfo"];
    if ([].includes(row["comComertialReagentId"])) {
      meta = null;
    }
    if (meta === null || meta === "") {
      meta = null;
    } else {
      meta = dJSON.parse(meta);
      meta = JSON.stringify(meta);
    }

    const values = [
      row["comComertialReagentId"],
      [0].includes(row["groupId"]) ? 2 : row["groupId"],
      [0].includes(row["createdBy"]) ? 5 : row["createdBy"],
      providerId,
      name,
      row["comReference"],
      row["deleted"] === null ? false : row["deleted"],
      meta,
    ];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.reagent_id_seq', (SELECT MAX(id) FROM public.reagent), true);");
}

async function migrateProtein() {
  const input = await mysqlPool.query("SELECT * FROM tblProtein");
  for (row of input[0]) {
    console.log(row);
    if (row["groupId"] !== 2) {
      continue;
    }
    const sql = 'INSERT INTO "protein"(id, group_id, created_by, name, description) VALUES($1, $2, $3, $4, $5)';
    const values = [
      row["proProteinId"],
      [0, 21].includes(row["groupId"]) ? 2 : row["groupId"],
      [0].includes(row["createdBy"]) ? 5 : row["createdBy"],
      row["proName"],
      row["proDescription"] === "" || row["proDescription"] === "0" ? null : row["proDescription"],
    ];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.protein_id_seq', (SELECT MAX(id) FROM public.protein), true);");
}

async function migrateClone() {
  const input = await mysqlPool.query("SELECT * FROM tblClone");
  for (row of input[0]) {
    console.log(row);
    if (row["groupId"] !== 2) {
      continue;
    }
    const sql =
      'INSERT INTO "clone"(id, group_id, created_by, protein_id, species_id, name, isotype, epitope, is_phospho, is_polyclonal, reactivity, application, is_deleted, is_public, meta) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)';

    let reactivity = row["cloReactivity"];
    if (reactivity === "") {
      reactivity = [];
    } else {
      reactivity = row["cloReactivity"]
        .split(",")
        .filter(item => item !== "")
        .map(item => parseInt(item, 10))
        .filter(item => !isNaN(item));
    }

    let application = row["cloApplication"];
    if (application === null || application.toString() === "") {
      application = null;
    } else {
      application = application.toString();
      application = JSON.parse(application);
      application = JSON.stringify(application);
    }

    let meta = row["catchedInfo"];
    if ([1903, 2332, 2340, 2376].includes(row["cloCloneId"])) {
      meta = null;
    }
    if (meta === null || meta === "") {
      meta = null;
    } else {
      meta = dJSON.parse(meta);
      meta = JSON.stringify(meta);
    }

    let cloneName = row["cloName"];
    if (cloneName === null) {
      cloneName = "";
    }

    let speciesId = [0, 64].includes(row["cloSpeciesHost"]) ? null : row["cloSpeciesHost"];
    if (speciesId === 37) {
      speciesId = 22;
    }

    const values = [
      row["cloCloneId"],
      row["groupId"],
      [0, 76].includes(row["createdBy"]) ? 5 : row["createdBy"],
      [null, 0, 11111, 1111111].includes(row["cloProteinId"]) ? 1300 : row["cloProteinId"],
      speciesId,
      cloneName,
      row["cloIsotype"],
      row["cloBindingRegion"],
      row["cloIsPhospho"],
      row["cloIsPolyclonal"],
      reactivity,
      application,
      row["deleted"] === null ? false : row["deleted"],
      row["cloPublic"] === null ? false : row["cloPublic"],
      meta,
    ];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.clone_id_seq', (SELECT MAX(id) FROM public.clone), true);");
}

async function migrateLot() {
  const input = await mysqlPool.query("SELECT * FROM tblReagentInstance");
  for (row of input[0]) {
    console.log(row);

    if (row["groupId"] !== 2) {
      continue;
    }

    if ([0, 462, 707].includes(row["lotCloneId"])) {
      continue;
    }

    const reagentId = row["reiComertialReagentId"];
    if ([null, 11111].includes(reagentId)) {
      continue;
    }

    const sql =
      'INSERT INTO "lot"(id, group_id, created_by, reagent_id, provider_id, clone_id, requested_by, approved_by, ordered_by, received_by, finished_by, number, status, purpose, link, requested_at, approved_at, ordered_at, received_at, finished_at, is_low, is_deleted, meta) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)';

    let meta = row["catchedInfo"];
    if (
      [1977, 2293, 2732, 3252, 3399, 3425, 3485, 3495, 3512, 3634, 3666, 3690, 3702, 3703].includes(
        row["reiReagentInstanceId"]
      )
    ) {
      meta = null;
    }
    if (meta === null || meta === "") {
      meta = null;
    } else {
      meta = dJSON.parse(meta, true);
      meta = JSON.stringify(meta);
    }

    const values = [
      row["reiReagentInstanceId"],
      row["groupId"],
      [0, 76].includes(row["createdBy"]) ? 5 : row["createdBy"],
      reagentId,
      [0, 26].includes(row["lotProviderId"]) ? null : row["lotProviderId"],
      row["lotCloneId"],
      row["reiRequestedBy"] === 0 || row["reiRequestedBy"] === 76 ? null : row["reiRequestedBy"],
      row["reiApprovedBy"] === 0 || row["reiApprovedBy"] === 76 ? null : row["reiApprovedBy"],
      row["reiOrderedBy"] === 0 || row["reiOrderedBy"] === 76 ? null : row["reiOrderedBy"],
      row["reiReceivedBy"] === 0 || row["reiReceivedBy"] === 76 ? null : row["reiReceivedBy"],
      row["tubFinishedBy"] === 0 || row["tubFinishedBy"] === 76 ? null : row["tubFinishedBy"],
      row["lotNumber"],
      row["reiStatus"],
      row["reiPurpose"],
      row["lotDataSheetLink"] === "0" ? null : row["lotDataSheetLink"],
      row["reiRequestedAt"] === "" || row["reiRequestedAt"] === null || row["reiRequestedAt"] === "0"
        ? null
        : row["reiRequestedAt"].replace("0000", "").trim(),
      row["reiApprovedAt"] === "" || row["reiApprovedAt"] === null || row["reiApprovedAt"] === "0"
        ? null
        : row["reiApprovedAt"].replace("0000", "").trim(),
      row["reiOrderedAt"] === "" || row["reiOrderedAt"] === null || row["reiOrderedAt"] === "0"
        ? null
        : row["reiOrderedAt"].replace("0000", "").trim(),
      row["reiReceivedAt"] === "" || row["reiReceivedAt"] === null || row["reiReceivedAt"] === "0"
        ? null
        : row["reiReceivedAt"].replace("0000", "").trim(),
      row["tubFinishedAt"] === "" || row["tubFinishedAt"] === null || row["tubFinishedAt"] === "0"
        ? null
        : row["tubFinishedAt"].replace("0000", "").trim(),
      row["tubIsLow"] === null ? false : row["tubIsLow"],
      row["deleted"] === null ? false : row["deleted"],
      meta,
    ];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.lot_id_seq', (SELECT MAX(id) FROM public.lot), true);");
}

async function migrateConjugate() {
  const input = await mysqlPool.query("SELECT * FROM tblLabeledAntibody");
  for (row of input[0]) {
    console.log(row);

    if (row["groupId"] !== 2) {
      continue;
    }

    if ([965, 1154, 1286].includes(row["labLotId"])) {
      continue;
    }

    const sql =
      'INSERT INTO "conjugate"(id, group_id, created_by, lot_id, tag_id, finished_by, finished_at, tube_number, concentration, is_low, is_deleted, description, labeled_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
    const values = [
      row["labLabeledAntibodyId"],
      row["groupId"],
      [0].includes(row["createdBy"]) ? 5 : row["createdBy"],
      row["labLotId"],
      row["labTagId"],
      [0].includes(row["tubFinishedBy"]) ? null : row["tubFinishedBy"],
      row["tubFinishedAt"] === "" || row["tubFinishedAt"] === null || row["tubFinishedAt"] === "0"
        ? null
        : row["tubFinishedAt"]
            .replace("0000", "")
            .replace("0100", "")
            .replace("0200", "")
            .trim(),
      row["labBBTubeNumber"],
      row["labConcentration"],
      row["tubIsLow"] === 0 ? false : true,
      row["deleted"],
      row["catchedInfo"],
      row["labDateOfLabeling"] === "" || row["labDateOfLabeling"] === null || row["labDateOfLabeling"] === "0"
        ? null
        : row["labDateOfLabeling"]
            .replace("0000", "")
            .replace("0100", "")
            .replace("0200", "")
            .trim(),
    ];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.conjugate_id_seq', (SELECT MAX(id) FROM public.conjugate), true);");
}

async function migratePanel() {
  const input = await mysqlPool.query("SELECT * FROM tblPanel");
  for (row of input[0]) {
    console.log(row);
    if (row["groupId"] !== 2) {
      continue;
    }
    const sql =
      'INSERT INTO "panel"(id, group_id, created_by, name, description, details, is_fluor, is_production, application, is_deleted) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

    let details = row["panDetails"];
    if ([538, 649, 661].includes(row["panPanelId"])) {
      details = null;
    }
    if (details === null || details === "") {
      details = null;
    } else {
      details = dJSON.parse(details, true);
      details = JSON.stringify(details);
    }

    const values = [
      row["panPanelId"],
      row["groupId"],
      row["createdBy"],
      row["panName"] !== null ? row["panName"].toString() : null,
      row["panDescription"],
      details,
      row["panFluor"] === null ? false : row["panFluor"],
      row["panIsProduction"] === null ? false : row["panIsProduction"],
      row["panApplication"],
      row["deleted"] === null ? false : row["deleted"],
    ];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query("SELECT setval('public.panel_id_seq', (SELECT MAX(id) FROM public.panel), true);");
}

async function migrateValidation() {
  const input = await postgresPool.query("SELECT * FROM clone");
  for (row of input.rows) {
    // console.log(row);
    const sql =
      'INSERT INTO "validation"(group_id, created_by, clone_id, lot_id, conjugate_id, species_id, file_id, application, positive_control, negative_control, incubation_conditions, concentration, concentration_unit, tissue, fixation, fixation_notes, notes, status, antigen_retrieval_type, antigen_retrieval_time, antigen_retrieval_temperature, saponin, saponin_concentration, methanol_treatment, methanol_treatment_concentration, surface_staining, surface_staining_concentration, meta, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)';

    if (!row["meta"]) {
      continue;
    }

    for (item of row["meta"]) {
      console.log(item);

      if (item["app"] === undefined) {
        continue;
      }

      let saponin = null;
      if (item["saponin"] === "0") {
        saponin = true;
      } else if (item["saponin"] === "1") {
        saponin = false;
      }

      let methanolTreatment = null;
      if (item["metoh"] === "0") {
        methanolTreatment = true;
      } else if (item["metoh"] === "1") {
        methanolTreatment = false;
      }

      let surfaceStaining = null;
      if (item["surface"] === "0") {
        surfaceStaining = true;
      } else if (item["surface"] === "1") {
        surfaceStaining = false;
      }

      let createdAt = "now()";
      if (item["date"]) {
        const date = new Date(item["date"].replace("0000", "").trim());
        createdAt = date.toISOString();
      }

      let createdBy = null;
      if (item["personId"]) {
        const groupUser = await postgresPool.query(
          `SELECT * FROM group_user WHERE group_id=${row["group_id"]} AND user_id=${Number(item["personId"])}`
        );
        createdBy = groupUser.rows[0].id;
      }
      if (!createdBy) {
        createdBy = row["created_by"];
      }

      const values = [
        row["group_id"],
        createdBy,
        row["id"],
        item["lot"],
        item["conjugate"],
        item["speciesTested"],
        ["undefined"].includes(item["file"]) ? null : item["file"],
        item["app"],
        item["sample"],
        item["negSample"],
        item["incConditions"],
        item["abConc"],
        item["concUnitType"],
        item["tissue"],
        item["fixation"],
        item["fixationNotes"],
        item["note"],
        item["val"],
        item["antigenRetrievalType"],
        item["antigenRetrievalTime"],
        item["antigenRetrievalTemp"],
        saponin,
        item["saponinConc"],
        methanolTreatment,
        item["metohConc"],
        surfaceStaining,
        item["surfaceConc"],
        item,
        createdAt,
      ];
      await postgresPool.query(sql, values);
    }
  }
}

async function migrateValidationFile() {
  const input = await mysqlPool.query("SELECT * FROM tblFile");
  for (row of input[0]) {
    console.log(row);
    if (row["groupId"] !== 2) {
      continue;
    }

    const sql =
      'INSERT INTO "validation_file"(id, validation_id, created_by, name, extension, size, hash) VALUES($1, $2, $3, $4, $5, $6, $7)';

    const name =
      row["catchedInfo"] === "" || row["catchedInfo"] === null
        ? null
        : row["catchedInfo"].replace("||", "|").split("|")[0];
    const size =
      row["catchedInfo"] === "" || row["catchedInfo"] === null
        ? null
        : row["catchedInfo"].replace("||", "|").split("|")[1];

    const validation = await postgresPool.query(`SELECT * FROM validation WHERE file_id=${row["filFileId"]}`);
    if (!validation.rows[0]) {
      console.log("Validation not found: ", row);
      continue;
    }

    const values = [
      row["filFileId"],
      validation.rows[0].id,
      row["createdBy"],
      name,
      row["filExtension"],
      size,
      row["filHash"],
    ];
    await postgresPool.query(sql, values);
  }
  await postgresPool.query(
    "SELECT setval('public.validation_file_id_seq', (SELECT MAX(id) FROM public.validation_file), true);"
  );
}

async function downloadFiles() {
  const input = await postgresPool.query("SELECT * FROM validation_file");

  const bucketName = "bblab_airlab_files";
  const storage = new Storage({ keyFilename: "/home/anton/Documents/key.json", projectId: "api-project-209144424908" });
  const bucket = await storage.bucket(bucketName);

  // const [files] = await storage.bucket(bucketName).getFiles();
  // files.forEach(async file => {
  //   console.log(file.name);
  // });

  for (row of input.rows) {
    const source = row["hash"].replace("_", "/") + "." + row["extension"];
    const destinationDir = "/home/anton/Downloads/airlab/uploads/validation/" + row["validation_id"] + "/";
    const destination = destinationDir + row["hash"] + "." + row["extension"];
    let file = await bucket.file("files/" + source);
    let exists = await file.exists();
    if (exists[0]) {
      if (!fs.existsSync(destinationDir)) {
        mkdirp.sync(destinationDir);
      }
      await file.download({
        // The path to which the file should be downloaded, e.g. "./file.txt"
        destination: destination,
      });
    } else {
      file = await bucket.file("temp/" + source);
      exists = await file.exists();
      if (exists[0]) {
        if (!fs.existsSync(destinationDir)) {
          mkdirp.sync(destinationDir);
        }
        await file.download({
          // The path to which the file should be downloaded, e.g. "./file.txt"
          destination: destination,
        });
      }
    }
    if (!exists[0]) {
      console.log("Missing: ", row);
    }
  }
}

async function migrate() {
  await migrateGroup();
  await migrateUser();
  await migrateGroupUser();
  await migrateSpecies();
  await migrateTag();
  await migrateProvider();
  await migrateReagent();
  await migrateProtein();
  await migrateClone();
  await migrateLot();
  await migrateConjugate();
  await migratePanel();
  await migrateValidation();
  await migrateValidationFile();

  // await downloadFiles();
}

migrate().then(() => {
  console.log("Done.");
});
