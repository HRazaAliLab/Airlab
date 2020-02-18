import { saveAs } from "file-saver";
import { getMassForIsotope } from "@/utils/IsotopeMasses";
import { PanelDto } from "@airlab/shared/lib/panel/dto";
import { TemplateCyTOF1, TemplateCyTOF2, TemplateHelios } from "@/utils/templates";

export function exportCsv(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/csv" });
  saveAs(blob, filename);
}

export function exportXml(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/xml" });
  saveAs(blob, filename);
}

function addComponentsPanelToTemplate(
  panel: PanelDto,
  txtTemplate: string,
  items: any[],
  templateName: string,
  version: number
) {
  const comps = txtTemplate.split("-----+++");
  if (comps.length == 3 && version < 3) {
    let firstPart = comps[0];

    while (firstPart.indexOf("{panelName}") > -1) {
      firstPart = firstPart.replace("{panelName}", panel.name);
    }

    if (items) {
      const used: any[] = [];
      const secondPart = comps[1];
      for (const item of items) {
        let aSecond = secondPart.replace("{panelName}", panel.name);
        const keyForMass = item.tag.name + "-" + item.tag.mw;
        let found = false;
        for (const u in used) {
          if (parseInt(item.tag.mw) == parseInt(used[u])) {
            found = true;
          }
        }
        if (found) continue;
        else used.push(item.tag.mw);

        const mass = getMassForIsotope(keyForMass);

        aSecond = aSecond.replace("{isotopeMass}", mass);

        if (item.lot && item.lot.clone && item.lot.clone.protein) {
          let proName = item.lot.clone.protein.name;
          proName = proName
            .replace(" ", "")
            .replace("_", "")
            .replace("/", "")
            .replace("\\", "");
          let descrp = proName.substring(0, proName.length > 7 ? 7 : proName.length);
          if (item.lot.clone.isPhospho) descrp += "_phospho";
          descrp += "_";
          descrp += item.lot.clone.id;
          descrp += "((" + item.id + "))";
          descrp += item.tag.name + item.tag.mw;
          aSecond = aSecond.replace("{protName}", descrp);
          aSecond = aSecond.replace("{protDescription}", descrp);
        } else {
          aSecond = aSecond.replace("{protName}", "UnknownProtein");
          aSecond = aSecond.replace("{protDescription}", "UnknownClone");
        }

        aSecond = aSecond.replace("{atom}", item.tag.name);
        aSecond = aSecond.replace("{atom}", item.tag.name);
        aSecond = aSecond.replace("{atomShortMass}", item.tag.mw);
        aSecond = aSecond.replace("{orderNumber}", (3000 + parseInt(item.tubeNumber)).toString(10));
        firstPart += aSecond;
      }
    }
    firstPart += comps[2];
    exportXml(firstPart, panel.name + "_" + templateName + ".conf");
  } else if (comps.length == 3 && version > 2) {
    let firstPart = comps[0];

    if (items) {
      const used: any[] = [];
      const secondPart = comps[1];
      for (const item of items) {
        let aSecond = secondPart.replace("{panelName}", panel.name);
        const keyForMass = item.tag.name + "-" + item.tag.mw;
        let found = false;
        for (const u in used) {
          if (parseInt(item.tag.mw) == parseInt(used[u])) {
            found = true;
          }
        }
        if (found) continue;
        else used.push(item.tag.mw);
        const mass = getMassForIsotope(keyForMass);
        aSecond = aSecond.replace("{isotopeMass}", mass);
        if (item.lot && item.lot.clone && item.lot.clone.protein) {
          let proName = item.lot.clone.protein.name;
          proName = proName
            .replace(" ", "")
            .replace("_", "")
            .replace("/", "")
            .replace("\\", "");
          let descrp = proName.substring(0, proName.length > 7 ? 7 : proName.length);
          if (item.lot.clone.isPhospho) descrp += "_phospho";
          descrp += "_";
          descrp += item.lot.clone.id;
          descrp += "((" + item.id + "))";
          descrp += item.tag.name + item.tag.mw;
          aSecond = aSecond.replace("{protName}", descrp);
          aSecond = aSecond.replace("{protDescription}", descrp);
        } else {
          aSecond = aSecond.replace("{protName}", "UnknownProtein");
          aSecond = aSecond.replace("{protDescription}", "UnknownClone");
        }
        aSecond = aSecond.replace("{atom}", item.tag.name);
        aSecond = aSecond.replace("{atom}", item.tag.name);
        aSecond = aSecond.replace("{atom}", item.tag.name);
        aSecond = aSecond.replace("{atomShortMass}", item.tag.mw);
        aSecond = aSecond.replace("{atomShortMass}", item.tag.mw);
        aSecond = aSecond.replace("{atomShortMass}", item.tag.mw);
        aSecond = aSecond.replace("{orderNumber}", (3000 + parseInt(item.tubeNumber)).toString(10));
        firstPart += aSecond;
      }
    }
    let thirdPart = comps[2];
    while (thirdPart.indexOf("{panelName}") > -1) {
      thirdPart = thirdPart.replace("{panelName}", panel.name);
    }
    firstPart += thirdPart;
    exportXml(firstPart, panel.name + "_" + templateName + ".tem");
  } else {
    alert("Something went wrong and a template can't be generated");
  }
}

export function exportPanelCsv(panel: PanelDto, items, totalVolume: number) {
  let txt = `Total Volume: ${totalVolume}uL,,,,,,\rTube Number,Metal Tag,Target,Antibody Clone,Stock Concentration,Final Concentration / Dilution,uL to add\r`;
  for (const item of items) {
    txt += item.tubeNumber + ",";
    txt += item.tag.name + item.tag.mw + ",";
    txt += item.lot.clone.protein.name.replace(/,/g, "-") + ",";
    txt += item.lot.clone.name.replace(/,/g, "-") + ",";
    txt += item.concentration + ",";
    if (item.dilutionType === 1) {
      txt += "1/" + item.actualConcentration + ",";
    } else {
      txt += item.actualConcentration + " ug/mL,";
    }
    txt += item.pipet + "\n";
  }
  exportCsv(txt, panel.name + ".csv");
}

export function exportCSVCyTOF201608(panel: PanelDto, items) {
  let txt = "AnalyteName,Label,Target\r";
  for (const item of items) {
    txt += item.tag.name + "(" + item.tag.mw + "),";
    txt += item.tag.mw + item.tag.name + ",";
    if (item.lot && item.lot.clone && item.lot.clone.protein) {
      let proName = item.lot.clone.protein.name;
      proName = proName
        .replace(" ", "")
        .replace("_", "")
        .replace("/", "")
        .replace("\\", "");
      let descrp = proName.substring(0, proName.length > 7 ? 7 : proName.length);
      if (item.lot.clone.isPhospho) descrp += "_phospho";
      descrp += "_";
      descrp += item.lot.clone.id;
      descrp += "((" + item.id + "))";
      descrp += item.tag.name + item.tag.mw;
      txt += descrp;
    } else txt += "UnknownProtein";
    txt += "\n";
  }
  exportCsv(txt, panel.name + ".csv");
}

export function exportCyTOF1Panel(panel: PanelDto, items) {
  addComponentsPanelToTemplate(panel, TemplateCyTOF1, items, "TemplateCyTOF1", 1);
}

export function exportCyTOF2Panel(panel: PanelDto, items) {
  addComponentsPanelToTemplate(panel, TemplateCyTOF2, items, "TemplateCyTOF2", 2);
}

export function exportHeliosPanel(panel: PanelDto, items) {
  addComponentsPanelToTemplate(panel, TemplateHelios, items, "TemplateHelios", 3);
}
