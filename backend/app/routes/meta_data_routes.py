from fastapi import APIRouter, HTTPException
from typing import List
from app.services.extract_data import extract_data

from fastapi.responses import JSONResponse
import json

# Sample metadata array containing experiment data
EXPERIMENT_DATA = [
    {
        "experiment_id": 0,
        "payload_identifier": "RR-8",
        "project_title": "Rodent Research-8",
        "project_type": "Spaceflight Study",
        "flight_program": "International Space Station (ISS)",
        "experiment_platform": "Rodent Habitat",
        "sponsoring_agency": "NASA",
        "nasa_center": "Ames Research Center (ARC)",
        "funding_source": "This sequencing analysis was funded by the NASA Space Biology program within the NASA Science Mission Directorate's (SMD) Biological and Physical Sciences (BPS) Division.",
        "sample_name": "RR8_LVR_BSL_ISS-T_OLD_BI1",
        "organism": "Mus musculus",
        "strain": "BALB/cAnNTac",
        "genotype": "Wild Type",
        "storage_temp": "-80 degree Celsius",
        "description": "Rodent Research-8 (RR-8) was conducted aboard the International Space Station (ISS) to study the long-term biological impacts of spaceflight on rodent models. The data collected provided insights into how organisms respond to the extreme conditions of space, contributing to future research on astronaut health."
    },
    {
        "experiment_id": 1,
        "payload_identifier": "RR-23",
        "project_title": "Effects of Microgravity on Ocular Vascular Hydrodynamics",
        "project_type": "Spaceflight Study",
        "flight_program": "International Space Station (ISS)",
        "experiment_platform": "Rodent Flight Hardware (Transporter and Habitat)",
        "sponsoring_agency": "NASA",
        "nasa_center": "Ames Research Center (ARC)",
        "funding_source": "The sequencing analysis was funded by the NASA Space Biology program within the NASA Science Mission Directorate's (SMD) Biological and Physical Sciences (BPS) Division.",
        "source_name": "BL_ISS_02",
        "sample_name": "RR8_LVR_BSL_ISS-T_OLD_BI2",
        "organism": "Mus musculus",
        "strain": "BALB/cAnNTac",
        "genotype": "Wild Type",
        "storage_temp": "-80 degree Celsius",
        "description": "Rodent Research-23 (RR-23) focused on understanding the effects of microgravity on the vascular system, specifically in the ocular region. By studying the fluid dynamics in the eyes of rodents, researchers aim to understand the potential risks to astronaut vision during prolonged space missions."
    }
]

# Define an API router
router = APIRouter()

@router.get("/meta/{experiment_id}")
async def get_experiment_meta(experiment_id: int):
    experiment = next((exp for exp in EXPERIMENT_DATA if exp["experiment_id"] == experiment_id), None)
    
    if experiment:
        return experiment
    else:
        raise HTTPException(status_code=404, detail=f"Experiment with ID {experiment_id} not found")


@router.get("/meta/table/{experiment_id}")
async def get_csv_data(experiment_id: int):
    data = extract_data(experiment_id)

    return data