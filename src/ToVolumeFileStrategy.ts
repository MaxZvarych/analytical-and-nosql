import { OutputDataStrategy, ShelterAnimalContent } from "./OutputDataStrategy";
import fs from 'fs';

export default class ToVolumeFileStrategy implements OutputDataStrategy {
    data: ShelterAnimalContent[];
    constructor(data: ShelterAnimalContent[]) {
        this.data = data;
    }
    output( ):void {
        let jsonData = {"animals":this.data};
        let jsonContent = JSON.stringify(jsonData);
        console.log(jsonContent);
        fs.writeFile("./src/text_volume/output.txt", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
            console.log("JSON file has been saved.");
        });
    }
}

const fileWriter= new ToVolumeFileStrategy([
    {
        animal_id: "A1093136",
        animal_type: "CAT",
        animal_breed: "DOMESTIC SH",
        kennel_number: "K01",
        kennel_status: "IMPOUNDED",
        activity_number: "A19-203263",
        activity_sequence: "1",
        source_id: "P0740141",
        census_tract: "012900",
        council_district: "9",
        intake_type: "STRAY",
        intake_subtype: "CONFINED",
        intake_total: "1",
        reason: "OTHRINTAKS",
        staff_id: "AR1758",
        intake_date: "2019-11-28T00:00:00.000",
        intake_time: "12:52:00",
        due_out: "2019-12-05T00:00:00.000",
        intake_condition: "APP WNL",
        hold_request: "ADOP RESCU",
        outcome_type: "ADOPTION",
        outcome_subtype: "WALK IN",
        outcome_date: "2019-12-19T00:00:00.000",
        outcome_time: "14:56:00",
        receipt_number: "R19-561166",
        impound_number: "K19-489088",
        outcome_condition: "APP WNL",
        chip_status: "SCAN CHIP",
        animal_origin: "FIELD",
        additional_information: "ADOPTION",
        month: "NOV.2019",
        year: "FY2020"
    },
    {
        animal_id: "A1046046",
        animal_type: "DOG",
        animal_breed: "PIT BULL",
        kennel_number: "AD 085",
        kennel_status: "UNAVAILABLE",
        activity_number: "A19-203263",
        activity_sequence: "1",
        source_id: "P0740141",
        census_tract: "012900",
        council_district: "9",
        intake_type: "STRAY",
        intake_subtype: "CONFINED",
        intake_total: "1",
        reason: "OTHRINTAKS",
        staff_id: "AR1758",
        intake_date: "2019-11-28T00:00:00.000",
        intake_time: "12:52:00",
        due_out: "2019-12-05T00:00:00.000",
        intake_condition: "APP WNL",
        hold_request: "ADOP RESCU",
        outcome_type: "ADOPTION",
        outcome_subtype: "WALK IN",
        outcome_date: "2019-12-19T00:00:00.000",
        outcome_time: "14:56:00",
        receipt_number: "R19-561166",
        impound_number: "K19-489088",
        outcome_condition: "APP WNL",
        chip_status: "SCAN CHIP",
        animal_origin: "FIELD",
        additional_information: "ADOPTION",
        month: "NOV.2019",
        year: "FY2020"
    },
    {
        animal_id: "A1098758",
        animal_type: "BIRD",
        animal_breed: "HAWK",
        kennel_number: "RECEIVING",
        kennel_status: "UNAVAILABLE",
        activity_number: "A19-203263",
        activity_sequence: "1",
        source_id: "P0740141",
        census_tract: "012900",
        council_district: "9",
        intake_type: "STRAY",
        intake_subtype: "CONFINED",
        intake_total: "1",
        reason: "OTHRINTAKS",
        staff_id: "AR1758",
        intake_date: "2019-11-28T00:00:00.000",
        intake_time: "12:52:00",
        due_out: "2019-12-05T00:00:00.000",
        intake_condition: "APP WNL",
        hold_request: "ADOP RESCU",
        outcome_type: "ADOPTION",
        outcome_subtype: "WALK IN",
        outcome_date: "2019-12-19T00:00:00.000",
        outcome_time: "14:56:00",
        receipt_number: "R19-561166",
        impound_number: "K19-489088",
        outcome_condition: "APP WNL",
        chip_status: "SCAN CHIP",
        animal_origin: "FIELD",
        additional_information: "ADOPTION",
        month: "NOV.2019",
        year: "FY2020"
    },
    {
        animal_id: "A1061310",
        animal_type: "DOG",
        animal_breed: "LABRADOR RETR",
        kennel_number: "LFD 163",
        kennel_status: "UNAVAILABLE",
        activity_number: "A19-203263",
        activity_sequence: "1",
        source_id: "P0740141",
        census_tract: "012900",
        council_district: "9",
        intake_type: "STRAY",
        intake_subtype: "CONFINED",
        intake_total: "1",
        reason: "OTHRINTAKS",
        staff_id: "AR1758",
        intake_date: "2019-11-28T00:00:00.000",
        intake_time: "12:52:00",
        due_out: "2019-12-05T00:00:00.000",
        intake_condition: "APP WNL",
        hold_request: "ADOP RESCU",
        outcome_type: "ADOPTION",
        outcome_subtype: "WALK IN",
        outcome_date: "2019-12-19T00:00:00.000",
        outcome_time: "14:56:00",
        receipt_number: "R19-561166",
        impound_number: "K19-489088",
        outcome_condition: "APP WNL",
        chip_status: "SCAN CHIP",
        animal_origin: "FIELD",
        additional_information: "ADOPTION",
        month: "NOV.2019",
        year: "FY2020"
    }])

    fileWriter.output()