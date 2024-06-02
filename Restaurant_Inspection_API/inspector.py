import csv
import typing
import inspection

class Inspector:
    @staticmethod
    def get_inspections(cuisine=None, restaurant_name=None, zipcode=None, limit=None) -> typing.List[dict]:
        inspections_data = []
        with open("data.csv", encoding="utf-8") as file:
            reader = csv.reader(file, delimiter=",")
            # Skip the first row, which is considered the header.
            next(reader)

            count = 0
            for line in reader:
                inspection_dict = {
                    "restaurant_id": line[0],
                    "restaurant_name": line[1],
                    "borough": line[2],
                    "zipcode": line[5],
                    "cuisine": line[7],
                    "inspection_date": line[8],
                    "violation_code": line[10],
                    "violation_description": line[11],
                    "score": line[13],
                    "grade": line[14],
                    "grade_date": line[15],
                }
                # Check if the inspection matches the filter criteria
                if (cuisine is None or inspection_dict["cuisine"].lower() == cuisine.lower()) and \
                   (restaurant_name is None or restaurant_name.lower() in inspection_dict["restaurant_name"].lower()) and \
                   (zipcode is None or inspection_dict["zipcode"] == zipcode):
                    inspections_data.append(inspection_dict)
                    count += 1
                    if limit and count >= limit:
                        break
        return inspections_data
