// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2/promise");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Pool } = require("pg");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dJSON = require("dirty-json");

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
    const sql = 'INSERT INTO "group"(id, name, institution, url, accept_requests) VALUES($1, $2, $3, $4, $5)';
    const values = [
      row["grpGroupId"],
      row["grpName"],
      row["grpInstitution"],
      row["grpUrl"],
      row["grpAcceptRequests"] ? row["grpAcceptRequests"] : false,
    ];
    await postgresPool.query(sql, values);
  }
}

async function migrateUser() {
  const input = await mysqlPool.query("SELECT * FROM tblPerson");
  for (row of input[0]) {
    console.log(row);
    const sql =
      'INSERT INTO "user"(id, name, email, password, activation_key, is_active) VALUES($1, $2, $3, $4, $5, $6)';
    const values = [
      row["perPersonId"],
      `${row["perName"]} ${row["perLastname"]}`,
      row["perEmail"],
      row["perPassword"],
      row["zetActivationKey"],
      row["zetActive"],
    ];
    await postgresPool.query(sql, values);
  }
}

async function migrateGroupUser() {
  const input = await mysqlPool.query("SELECT * FROM tblZGroupPerson");
  for (row of input[0]) {
    console.log(row);
    const sql =
      'INSERT INTO "group_user"(id, group_id, user_id, role, activation_key, is_active, can_order, can_erase, can_finances, can_panels) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    const values = [
      row["gpeGroupPersonId"],
      [21].includes(row["gpeGroupId"]) ? 3 : row["gpeGroupId"],
      [777777777, 8, 52, 0].includes(row["gpePersonId"]) ? 292 : row["gpePersonId"],
      row["gpeRole"],
      row["zetActKey"],
      row["gpeActiveInGroup"],
      row["gpeOrders"],
      row["gpeErase"],
      row["gpeFinances"],
      row["gpeAllPanels"],
    ];
    await postgresPool.query(sql, values);
  }
}

async function migrateSpecies() {
  const input = await mysqlPool.query("SELECT * FROM tblSpecies");
  for (row of input[0]) {
    if ([37].includes(row["spcSpeciesId"])) {
      continue;
    }
    console.log(row);
    const sql = 'INSERT INTO "species"(id, name, acronym) VALUES($1, $2, $3)';
    const values = [row["spcSpeciesId"], row["spcName"], row["spcAcronym"]];
    await postgresPool.query(sql, values);
  }
}

async function migrateTag() {
  const input = await mysqlPool.query("SELECT * FROM tblTag");
  for (row of input[0]) {
    console.log(row);
    const sql = 'INSERT INTO "tag"(id, name, mw, is_fluorophore, is_metal) VALUES($1, $2, $3, $4, $5)';
    const values = [
      row["tagTagId"],
      row["tagName"],
      row["tagMW"] !== "" ? row["tagMW"] : null,
      row["tagIsFluorphore"],
      row["tagIsMetal"],
    ];
    await postgresPool.query(sql, values);
  }
}

async function migrateProvider() {
  const input = await mysqlPool.query("SELECT * FROM tblProvider");
  for (row of input[0]) {
    console.log(row);
    if ([87, 97].includes(row["proProviderId"])) {
      continue;
    }
    const sql = 'INSERT INTO "provider"(id, group_id, created_by, name) VALUES($1, $2, $3, $4)';
    const values = [row["proProviderId"], row["groupId"], row["createdBy"], row["proName"]];
    await postgresPool.query(sql, values);
  }
}

async function migrateReagent() {
  const input = await mysqlPool.query("SELECT * FROM tblComertialReagent");
  for (row of input[0]) {
    console.log(row);
    if (row["comName"] === null) {
      continue;
    }
    const sql =
      'INSERT INTO "reagent"(id, group_id, created_by, provider_id, name, reference, deleted, catched_info) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
    let providerId = [0, 25, 11111].includes(row["comProviderId"]) ? null : row["comProviderId"];
    if (providerId === 87) {
      providerId = 86;
    }
    if (providerId === 97) {
      providerId = 18;
    }
    const values = [
      row["comComertialReagentId"],
      [0].includes(row["groupId"]) ? 3 : row["groupId"],
      [0].includes(row["createdBy"]) ? 5 : row["createdBy"],
      providerId,
      row["comName"],
      row["comReference"],
      row["deleted"] === null ? false : row["deleted"],
      row["catchedInfo"],
    ];
    await postgresPool.query(sql, values);
  }
}

async function migrateProtein() {
  const input = await mysqlPool.query("SELECT * FROM tblProtein");
  for (row of input[0]) {
    console.log(row);
    const sql = 'INSERT INTO "protein"(id, group_id, created_by, name) VALUES($1, $2, $3, $4)';
    const values = [
      row["proProteinId"],
      [0, 21].includes(row["groupId"]) ? 3 : row["groupId"],
      [0].includes(row["createdBy"]) ? 5 : row["createdBy"],
      row["proName"],
    ];
    await postgresPool.query(sql, values);
  }
}

async function migrateClone() {
  const input = await mysqlPool.query("SELECT * FROM tblClone");
  for (row of input[0]) {
    console.log(row);
    const sql =
      'INSERT INTO "clone"(id, group_id, created_by, protein_id, species_id, name, isotype, region, is_phospho, is_polyclonal, reactivity, application, deleted, public, meta) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)';

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
      [0].includes(row["groupId"]) ? 3 : row["groupId"],
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
    if ([null, 11111, 1570, 1644, 1771, 1834, 2027, 2223, 2225, 2226, 2266, 2355, 2480].includes(reagentId)) {
      continue;
    }

    const sql =
      'INSERT INTO "lot"(id, group_id, created_by, reagent_id, provider_id, clone_id, requested_by, approved_by, ordered_by, received_by, finished_by, number, status, purpose, link, requested_at, approved_at, ordered_at, received_at, finished_at, is_low, deleted, meta) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)';

    let meta = row["catchedInfo"];
    if ([1977, 2293, 2732, 3252, 3399, 3425, 3485, 3495, 3512].includes(row["reiReagentInstanceId"])) {
      meta = null;
    }
    if (meta === null || meta === "") {
      meta = null;
    } else {
      meta = dJSON.parse(meta);
      meta = JSON.stringify(meta);
    }

    const values = [
      row["reiReagentInstanceId"],
      row["groupId"],
      [0, 76].includes(row["createdBy"]) ? 5 : row["createdBy"],
      reagentId,
      [0, 26].includes(row["lotProviderId"]) ? null : row["lotProviderId"],
      row["lotCloneId"],
      row["reiRequestedBy"],
      row["reiApprovedBy"],
      row["reiOrderedBy"],
      row["reiReceivedBy"],
      row["tubFinishedBy"],
      row["lotNumber"],
      row["reiStatus"],
      row["reiPurpose"],
      row["lotDataSheetLink"],
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
}

async function migrate() {
  // await migrateGroup();
  // await migrateUser();
  // await migrateGroupUser();
  // await migrateSpecies();
  // await migrateTag();
  // await migrateProvider();
  // await migrateReagent();
  // await migrateProtein();
  // await migrateClone();
  await migrateLot();
}

migrate();
