export const ApiChatTempData = {
    "user_query": "Compare enrollment performance and safety profile for oncology studies with high dropout rates",
    "workflow_execution": {
        "terminology_agent": {
            "called": true,
            "status": "completed"
        },
        "context_agent": {
            "called": true,
            "status": "completed"
        },
        "domain_agents_called": [
            "clinical",
            "patient_safety"
        ],
        "routing_decision": "Query requires both clinical domain for enrollment performance analysis and patient safety domain for safety profile analysis of oncology studies with dropout concerns"
    },
    "domain_results": {
        "clinical": {
            "query_understanding": {
                "original_query": "Show enrollment performance data for oncology studies with high dropout rates",
                "query_type": "descriptive",
                "data_sources_needed": [
                    "enrollment data",
                    "retention data",
                    "oncology studies",
                    "site performance"
                ],
                "analysis_scope": "portfolio",
                "specific_questions": [
                    "Which oncology studies have high dropout rates?",
                    "What is the enrollment performance for these studies?",
                    "How do dropout rates correlate with enrollment metrics?",
                    "Which sites/studies are underperforming in retention?"
                ],
                "pattern_matched": "Enrollment and Screening Analysis Pattern"
            },
            "sql_query": "SELECT * \nFROM study_recruitment recruitment\nLEFT JOIN study study ON recruitment.study_id = study.study_id\nLEFT JOIN study_site site ON recruitment.site_id = site.site_id\nLEFT JOIN study_subject_demographics demographics ON recruitment.study_id = demographics.study_id \n    AND recruitment.site_id = demographics.site_id\nLEFT JOIN study_feasibility feasibility ON study.study_id = feasibility.study_id\nWHERE study.therapeutic_area = 'Oncology'\nLIMIT 1000",
            "query_execution": {
                "statusCode": 200,
                "queryId": "159b1efd-39b8-4d6f-ab4a-b06e4c755518",
                "total_rows": 24,
                "s3_location": "s3://clinical-develpoment-assistant-bucket/clinical_curated/athena_result/159b1efd-39b8-4d6f-ab4a-b06e4c755518.csv",
                "preview_rows": [
                    {
                        "study_id": "STUDY_001",
                        "site_id": "SITE_003",
                        "screened_count": "52",
                        "enrolled_count": "40",
                        "retention_rate": "0.92",
                        "therapeutic_area": "Oncology",
                        "study_phase": "Phase I/II"
                    },
                    {
                        "study_id": "STUDY_011",
                        "site_id": "SITE_025",
                        "screened_count": "18",
                        "enrolled_count": "12",
                        "retention_rate": "0.97",
                        "therapeutic_area": "Oncology",
                        "study_phase": "Phase III"
                    },
                    {
                        "study_id": "STUDY_013",
                        "site_id": "SITE_029",
                        "screened_count": "25",
                        "enrolled_count": "18",
                        "retention_rate": "0.93",
                        "therapeutic_area": "Oncology",
                        "study_phase": "Phase I"
                    }
                ]
            },
            "analysis_results": {
                "questions_answered": [
                    {
                        "question": "Which oncology studies have high dropout rates?",
                        "answer": "All oncology studies show relatively good retention rates (88-97%). SITE_006 has the lowest retention rate at 88%, while SITE_025 and SITE_024 have the highest at 97%.",
                        "supporting_data": {
                            "lowest_retention": "88%",
                            "highest_retention": "97%",
                            "average_retention": "92%"
                        },
                        "severity": "low"
                    },
                    {
                        "question": "What is the enrollment performance for these studies?",
                        "answer": "STUDY_001 dominates screening activity with 696 total screened subjects (62.5% of all screening), followed by STUDY_013 with 100 subjects and STUDY_011 with 72 subjects.",
                        "supporting_data": {
                            "total_screened": 910,
                            "total_enrolled": 540,
                            "conversion_rate": "59.3%"
                        },
                        "severity": "medium"
                    },
                    {
                        "question": "How do site performance vary across oncology studies?",
                        "answer": "8 sites are active with 3 primary sites (SITE_001, SITE_002, SITE_003) each handling 5 recruitment records (20.83% each), showing balanced distribution.",
                        "supporting_data": {
                            "active_sites": 8,
                            "top_3_sites_share": "62.5%"
                        },
                        "severity": "low"
                    }
                ],
                "key_metrics": {
                    "retention_rate": {
                        "value": 92,
                        "unit": "%",
                        "benchmark": "85%",
                        "status": "good",
                        "context": "All oncology studies maintain retention rates above industry benchmark"
                    },
                    "screening_conversion": {
                        "value": 59.3,
                        "unit": "%",
                        "benchmark": "60%",
                        "status": "normal",
                        "context": "Screening to enrollment conversion slightly below optimal"
                    },
                    "study_concentration": {
                        "value": 62.5,
                        "unit": "%",
                        "benchmark": "50%",
                        "status": "concerning",
                        "context": "STUDY_001 accounts for majority of screening activity"
                    }
                },
                "top_findings": [
                    {
                        "rank": 1,
                        "entity": "SITE_025",
                        "entity_type": "site",
                        "primary_metric": "retention_rate",
                        "value": 97,
                        "impact": "Best-in-class patient retention for Phase III oncology study",
                        "severity": "good"
                    },
                    {
                        "rank": 2,
                        "entity": "STUDY_001",
                        "entity_type": "study",
                        "primary_metric": "screened_count",
                        "value": 696,
                        "impact": "Dominates portfolio screening activity with potential resource concentration risk",
                        "severity": "medium"
                    },
                    {
                        "rank": 3,
                        "entity": "SITE_006",
                        "entity_type": "site",
                        "primary_metric": "retention_rate",
                        "value": 88,
                        "impact": "Lowest retention rate may indicate operational challenges",
                        "severity": "medium"
                    }
                ],
                "correlations_found": [
                    {
                        "factor_1": "study_phase",
                        "factor_2": "retention_rate",
                        "relationship": "Phase III studies show highest retention (97%) compared to Phase I/II (88-93%)",
                        "strength": "moderate",
                        "implication": "Later phase studies have more established protocols and patient populations"
                    }
                ]
            },
            "recommendations": [
                {
                    "priority": "high",
                    "action": "Investigate retention challenges at SITE_006 (88% retention rate)",
                    "rationale": "Lowest retention rate may indicate protocol deviations, patient management issues, or operational inefficiencies",
                    "expected_impact": "Improve retention to 92% average level",
                    "timeline": "Within 4 weeks",
                    "responsible_party": "Site Operations Manager"
                },
                {
                    "priority": "medium",
                    "action": "Diversify screening activity beyond STUDY_001",
                    "rationale": "62.5% concentration in single study creates resource dependency and portfolio risk",
                    "expected_impact": "Reduce single study risk and improve portfolio balance",
                    "timeline": "Next quarter",
                    "responsible_party": "Portfolio Management"
                },
                {
                    "priority": "medium",
                    "action": "Replicate SITE_025 and SITE_024 best practices (97% retention)",
                    "rationale": "Top-performing sites can provide operational excellence templates",
                    "expected_impact": "Raise portfolio average retention from 92% to 95%",
                    "timeline": "Within 8 weeks",
                    "responsible_party": "Clinical Operations"
                }
            ],
            "visualizations": {
                "primary_chart": {
                    "chart_type": "bar_chart",
                    "title": "Site Retention Performance in Oncology Studies",
                    "description": "Retention rates by clinical site showing performance variation across the oncology portfolio",
                    "x_axis": {
                        "label": "Clinical Sites",
                        "values": [
                            "SITE_025",
                            "SITE_024",
                            "SITE_029",
                            "SITE_028",
                            "SITE_003",
                            "SITE_002",
                            "SITE_001",
                            "SITE_006"
                        ]
                    },
                    "y_axis": {
                        "label": "Retention Rate (%)",
                        "values": [
                            97,
                            97,
                            93,
                            93,
                            90,
                            90,
                            90,
                            88
                        ]
                    },
                    "data_series": [
                        {
                            "name": "Retention Rate",
                            "data": [
                                97,
                                97,
                                93,
                                93,
                                90,
                                90,
                                90,
                                88
                            ],
                            "color": "green"
                        }
                    ],
                    "benchmark_line": {
                        "value": 85,
                        "label": "Industry Benchmark (85%)"
                    },
                    "color_coding": {
                        "green": "≥95% retention (excellent)",
                        "yellow": "90-94% retention (good)",
                        "red": "<90% retention (concerning)"
                    },
                    "key_insight": "All sites exceed industry benchmark, but SITE_006 lags significantly behind top performers"
                },
                "secondary_charts": {
                    "chart_type": "stacked_bar",
                    "title": "Screening vs Enrollment Activity by Study",
                    "description": "Total screening and enrollment volume showing conversion efficiency across oncology studies",
                    "data": {
                        "categories": [
                            "STUDY_001",
                            "STUDY_013",
                            "STUDY_011",
                            "STUDY_018"
                        ],
                        "series": [
                            {
                                "name": "Screened",
                                "data": [
                                    696,
                                    100,
                                    72,
                                    42
                                ]
                            },
                            {
                                "name": "Enrolled",
                                "data": [
                                    540,
                                    72,
                                    48,
                                    30
                                ]
                            }
                        ]
                    },
                    "key_insight": "STUDY_001 dominates activity but conversion rates vary significantly by study"
                },
                "data_table": {
                    "title": "Oncology Study Performance Summary",
                    "headers": [
                        "Study ID",
                        "Phase",
                        "Sites",
                        "Screened",
                        "Enrolled",
                        "Avg Retention",
                        "Target"
                    ],
                    "rows": [
                        [
                            "STUDY_001",
                            "Phase I/II",
                            "3",
                            "696",
                            "540",
                            "90%",
                            "46"
                        ],
                        [
                            "STUDY_011",
                            "Phase III",
                            "2",
                            "72",
                            "48",
                            "97%",
                            "820"
                        ],
                        [
                            "STUDY_013",
                            "Phase I",
                            "2",
                            "100",
                            "72",
                            "93%",
                            "36"
                        ],
                        [
                            "STUDY_018",
                            "Phase II",
                            "1",
                            "42",
                            "30",
                            "88%",
                            "212"
                        ]
                    ],
                    "formatting": {
                        "highlight_rows": [
                            1
                        ],
                        "color_code_column": "Avg Retention"
                    }
                }
            },
            "summary": "Analysis of oncology studies reveals generally strong retention performance (88-97%) with no significant dropout rate concerns. STUDY_001 dominates portfolio activity with 696 screened subjects (62.5% of total), creating potential concentration risk. Top-performing sites (SITE_025, SITE_024) achieve 97% retention while SITE_006 lags at 88%. Key opportunity exists to replicate best practices and address the performance gap at underperforming sites. Overall screening-to-enrollment conversion rate of 59.3% is slightly below optimal but acceptable.",
            "status": "success",
            "error": null
        },
        "patient_safety": {
            "query_understanding": {
                "original_query": "Show safety profile and adverse events for oncology studies with high dropout rates",
                "query_type": "safety_signal",
                "data_sources_needed": [
                    "safety cases",
                    "adverse events",
                    "subject dropouts",
                    "oncology studies"
                ],
                "analysis_scope": "oncology studies with dropout patterns",
                "specific_questions": [
                    "What are the most common adverse events in oncology studies?",
                    "Which studies have high dropout rates?",
                    "Is there a correlation between specific adverse events and dropout rates?",
                    "What safety signals emerge from high-dropout oncology studies?"
                ],
                "pattern_matched": "Subject Safety Profile Pattern"
            },
            "sql_query": "SELECT * \nFROM study_subject_medical_history history\nLEFT JOIN drug_dosage dosage ON history.study_id = dosage.study_id\nLEFT JOIN safety_case case_table ON history.subject_id = case_table.subject_id  \nLEFT JOIN subject_consent consent ON history.subject_id = consent.subject_id\nLEFT JOIN adverse_event event ON case_table.case_id = event.case_id\nWHERE history.condition_category LIKE '%oncology%' \n   OR dosage.dose_modification_reason IS NOT NULL\n   OR consent.withdrawal_reason IS NOT NULL\n   OR event.severity IN ('Severe', 'Serious', 'Life-threatening')\nLIMIT 1000",
            "query_execution": {
                "statusCode": 200,
                "queryId": "b4bd05dd-277d-48ba-a016-dff8b238196a",
                "total_rows": 97,
                "s3_location": "s3://clinical-develpoment-assistant-bucket/clinical_curated/athena_result/b4bd05dd-277d-48ba-a016-dff8b238196a.csv",
                "preview_rows": [
                    {
                        "subject_id": "SUBJ_001",
                        "condition_category": "Cardiovascular",
                        "event_term": "Headache",
                        "causality_rating": "Possible",
                        "withdrawal_reason": null,
                        "dose_modification_reason": "Continued at Reduced Dose"
                    },
                    {
                        "subject_id": "SUBJ_003",
                        "condition_category": "Musculoskeletal",
                        "event_term": "Hepatotoxicity",
                        "causality_rating": "Probable",
                        "withdrawal_reason": null,
                        "dose_modification_reason": "Resumed at Reduced Dose"
                    },
                    {
                        "subject_id": "SUBJ_008",
                        "condition_category": "Dermatologic",
                        "event_term": "Neutropenia",
                        "causality_rating": "Probable",
                        "withdrawal_reason": "Adverse Event",
                        "dose_modification_reason": "Dose Delay - Injection Site Reaction"
                    }
                ]
            },
            "analysis_results": {
                "questions_answered": [
                    {
                        "question": "What are the most common adverse events across studies with dose modifications?",
                        "answer": "Hepatotoxicity events dominate safety signals with 25.4% of events (Elevated ALT: 12.7%, Hepatotoxicity: 12.7%), followed by gastrointestinal symptoms (Nausea, Diarrhea: 6.35-4.76%) and hematologic toxicities (Neutropenia, Thrombocytopenia: 4.76%)",
                        "supporting_data": {
                            "total_ae_events": 63,
                            "hepatotoxicity_rate": 25.4,
                            "gi_toxicity_rate": 11.11,
                            "hematologic_toxicity_rate": 9.52
                        },
                        "severity": "high"
                    },
                    {
                        "question": "What is the causality assessment pattern for safety events?",
                        "answer": "80.96% of safety cases show drug-related causality (Probable: 49.21%, Possible: 31.75%), indicating strong safety signals requiring regulatory attention",
                        "supporting_data": {
                            "drug_related_cases": 80.96,
                            "probable_cases": 49.21,
                            "possible_cases": 31.75,
                            "unlikely_cases": 11.11
                        },
                        "severity": "critical"
                    },
                    {
                        "question": "What is the dropout rate pattern?",
                        "answer": "15.46% withdrawal rate with decreasing trend, but oncology subjects represent 11.34% of conditions studied, suggesting targeted safety monitoring needed",
                        "supporting_data": {
                            "active_subjects": 72.16,
                            "withdrawn_subjects": 15.46,
                            "oncology_conditions": 11.34,
                            "trend_direction": "decreasing"
                        },
                        "severity": "medium"
                    },
                    {
                        "question": "Are there safety signals specific to oncology studies?",
                        "answer": "Strong safety correlation exists: 100% of Serious Related events result in Recovery, but 100% of Serious Unrelated events result in Fatal outcomes, indicating need for better causality assessment in oncology populations",
                        "supporting_data": {
                            "serious_related_recovery": 100.0,
                            "serious_unrelated_fatal": 100.0,
                            "oncology_safety_cases": 11.34
                        },
                        "severity": "critical"
                    }
                ],
                "key_metrics": {
                    "hepatotoxicity_signal": {
                        "value": 25.4,
                        "unit": "%",
                        "benchmark": "10%",
                        "status": "critical",
                        "context": "Hepatotoxicity events (ALT elevation + Hepatotoxicity) represent major safety signal requiring dose optimization"
                    },
                    "drug_relatedness": {
                        "value": 80.96,
                        "unit": "%",
                        "benchmark": "50%",
                        "status": "critical",
                        "context": "High proportion of drug-related events suggests need for enhanced safety monitoring and risk mitigation"
                    },
                    "dropout_rate": {
                        "value": 15.46,
                        "unit": "%",
                        "benchmark": "20%",
                        "status": "good",
                        "context": "Withdrawal rate below benchmark but concentrated in safety-related discontinuations"
                    },
                    "oncology_representation": {
                        "value": 11.34,
                        "unit": "%",
                        "benchmark": "15%",
                        "status": "normal",
                        "context": "Oncology conditions well-represented in safety dataset for signal detection"
                    }
                },
                "top_findings": [
                    {
                        "rank": 1,
                        "entity": "Hepatotoxicity Complex",
                        "entity_type": "safety_signal",
                        "primary_metric": "event_frequency",
                        "value": 25.4,
                        "impact": "Liver toxicity represents dominant safety risk requiring enhanced monitoring and dose modifications",
                        "severity": "critical"
                    },
                    {
                        "rank": 2,
                        "entity": "Hematologic Toxicity",
                        "entity_type": "safety_signal",
                        "primary_metric": "event_frequency",
                        "value": 9.52,
                        "impact": "Neutropenia and thrombocytopenia driving dose delays and potential study discontinuation",
                        "severity": "high"
                    },
                    {
                        "rank": 3,
                        "entity": "SUBJ_008",
                        "entity_type": "subject",
                        "primary_metric": "adverse_event_withdrawal",
                        "value": 1,
                        "impact": "Subject withdrew due to hematologic adverse events, representing safety-driven dropout pattern",
                        "severity": "high"
                    },
                    {
                        "rank": 4,
                        "entity": "Gastrointestinal Syndrome",
                        "entity_type": "safety_signal",
                        "primary_metric": "event_frequency",
                        "value": 11.11,
                        "impact": "GI toxicity complex affecting patient quality of life and treatment compliance",
                        "severity": "medium"
                    },
                    {
                        "rank": 5,
                        "entity": "Fatal Outcome Pattern",
                        "entity_type": "safety_signal",
                        "primary_metric": "mortality_signal",
                        "value": 100,
                        "impact": "All Serious Unrelated events resulted in fatal outcomes, highlighting causality assessment importance",
                        "severity": "critical"
                    }
                ],
                "safety_signals": [
                    {
                        "signal_type": "Hepatotoxicity Cluster",
                        "description": "Combined elevated ALT and hepatotoxicity events represent 25.4% of safety events with probable drug causality",
                        "strength": "strong",
                        "recommendation": "Implement enhanced liver function monitoring and establish clear dose modification algorithms"
                    },
                    {
                        "signal_type": "Hematologic Toxicity Pattern",
                        "description": "Neutropenia and thrombocytopenia events causing dose delays and treatment discontinuations",
                        "strength": "moderate",
                        "recommendation": "Consider prophylactic growth factor support and more frequent hematologic monitoring"
                    },
                    {
                        "signal_type": "Safety-Driven Dropout",
                        "description": "15.46% withdrawal rate with adverse events as primary driver in oncology populations",
                        "strength": "moderate",
                        "recommendation": "Develop early intervention protocols for managing toxicities to prevent dropout"
                    },
                    {
                        "signal_type": "Causality Assessment Gap",
                        "description": "Perfect correlation between serious unrelated events and fatal outcomes suggests assessment bias",
                        "strength": "strong",
                        "recommendation": "Enhance causality assessment training and implement independent safety review"
                    }
                ]
            },
            "recommendations": [
                {
                    "priority": "critical",
                    "action": "Implement enhanced hepatotoxicity monitoring protocol with weekly liver function tests for first 8 weeks of treatment",
                    "rationale": "25.4% of safety events are hepatotoxicity-related with probable drug causality requiring proactive monitoring",
                    "expected_impact": "50% reduction in severe hepatotoxicity events through early detection and dose modification",
                    "timeline": "Implement within 30 days",
                    "responsible_party": "Safety Monitoring Committee"
                },
                {
                    "priority": "high",
                    "action": "Develop hematologic toxicity management algorithms including growth factor support criteria",
                    "rationale": "9.52% of events are hematologic toxicities causing dose delays and withdrawals",
                    "expected_impact": "Reduce hematologic-related dose delays by 40% and prevent safety-driven dropouts",
                    "timeline": "60 days",
                    "responsible_party": "Clinical Operations Team"
                },
                {
                    "priority": "high",
                    "action": "Establish independent causality assessment review board for all serious adverse events",
                    "rationale": "100% correlation between serious unrelated events and fatal outcomes suggests systematic bias in causality assessment",
                    "expected_impact": "Improve accuracy of safety signal detection and regulatory compliance",
                    "timeline": "45 days",
                    "responsible_party": "Pharmacovigilance Team"
                },
                {
                    "priority": "medium",
                    "action": "Create patient education program focused on early recognition and management of GI toxicities",
                    "rationale": "11.11% of events are gastrointestinal symptoms affecting treatment compliance and quality of life",
                    "expected_impact": "Improve patient-reported outcome measures and reduce treatment interruptions",
                    "timeline": "90 days",
                    "responsible_party": "Patient Experience Team"
                },
                {
                    "priority": "low",
                    "action": "Implement predictive analytics to identify subjects at high risk for safety-driven withdrawal",
                    "rationale": "Current 15.46% withdrawal rate could be reduced through early intervention",
                    "expected_impact": "10-15% reduction in safety-related study discontinuations",
                    "timeline": "120 days",
                    "responsible_party": "Data Science Team"
                }
            ],
            "visualizations": {
                "primary_chart": {
                    "chart_type": "stacked_bar",
                    "title": "Safety Event Distribution with Causality Assessment",
                    "description": "Shows frequency of adverse events with causality ratings, highlighting drug-related safety signals",
                    "x_axis": {
                        "label": "Adverse Event Terms",
                        "values": [
                            "Elevated ALT",
                            "Hepatotoxicity",
                            "Headache",
                            "Nausea",
                            "Dizziness",
                            "Thrombocytopenia",
                            "Neutropenia",
                            "Diarrhea",
                            "Pneumonia",
                            "Other"
                        ]
                    },
                    "y_axis": {
                        "label": "Event Count",
                        "values": [
                            8,
                            8,
                            4,
                            4,
                            4,
                            3,
                            3,
                            3,
                            3,
                            23
                        ]
                    },
                    "data_series": [
                        {
                            "name": "Probable",
                            "data": [
                                4,
                                4,
                                2,
                                2,
                                0,
                                2,
                                2,
                                2,
                                1,
                                12
                            ],
                            "color": "#dc3545"
                        },
                        {
                            "name": "Possible",
                            "data": [
                                3,
                                3,
                                2,
                                2,
                                1,
                                1,
                                1,
                                1,
                                1,
                                5
                            ],
                            "color": "#fd7e14"
                        },
                        {
                            "name": "Unlikely",
                            "data": [
                                1,
                                1,
                                0,
                                0,
                                3,
                                0,
                                0,
                                0,
                                1,
                                1
                            ],
                            "color": "#28a745"
                        },
                        {
                            "name": "Definite",
                            "data": [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                5
                            ],
                            "color": "#6f42c1"
                        }
                    ],
                    "benchmark_line": {
                        "value": 3.15,
                        "label": "Expected Event Frequency (3.15 per category)"
                    },
                    "color_coding": {
                        "red": "Probable/Definite drug-related events requiring immediate attention",
                        "orange": "Possible drug-related events needing closer monitoring",
                        "green": "Unlikely drug-related events with lower priority"
                    },
                    "key_insight": "Hepatotoxicity events show highest frequency with strong drug causality, representing critical safety signal"
                },
                "secondary_chart": {
                    "chart_type": "line_chart",
                    "title": "Subject Dropout Trends by Withdrawal Reason",
                    "description": "Temporal analysis of study withdrawals showing safety-related dropout patterns",
                    "data": {
                        "x_values": [
                            "2024-02-15",
                            "2024-02-28",
                            "2024-03-05",
                            "2024-03-10",
                            "2024-03-20"
                        ],
                        "series": [
                            {
                                "name": "Adverse Event",
                                "values": [
                                    1,
                                    1,
                                    1,
                                    1,
                                    1
                                ],
                                "color": "#dc3545"
                            },
                            {
                                "name": "Personal Reasons",
                                "values": [
                                    0,
                                    0,
                                    0,
                                    1,
                                    1
                                ],
                                "color": "#17a2b8"
                            },
                            {
                                "name": "Protocol Violation",
                                "values": [
                                    0,
                                    1,
                                    0,
                                    0,
                                    0
                                ],
                                "color": "#ffc107"
                            },
                            {
                                "name": "Investigator Decision",
                                "values": [
                                    0,
                                    0,
                                    1,
                                    0,
                                    0
                                ],
                                "color": "#6c757d"
                            },
                            {
                                "name": "Lack of Efficacy",
                                "values": [
                                    0,
                                    0,
                                    0,
                                    0,
                                    1
                                ],
                                "color": "#28a745"
                            }
                        ]
                    },
                    "key_insight": "Safety-driven withdrawals occur consistently throughout study period, indicating need for continuous monitoring"
                },
                "data_table": {
                    "title": "Critical Safety Cases Requiring Immediate Review",
                    "headers": [
                        "Case ID",
                        "Subject ID",
                        "Event Term",
                        "Causality",
                        "Outcome",
                        "Regulatory Class",
                        "Action Required"
                    ],
                    "rows": [
                        [
                            "CASE_002",
                            "SUBJ_003",
                            "Hepatotoxicity",
                            "Probable",
                            "Recovered",
                            "Serious Related",
                            "Enhanced liver monitoring"
                        ],
                        [
                            "CASE_004",
                            "SUBJ_008",
                            "Neutropenia",
                            "Probable",
                            "Recovered",
                            "Serious Related",
                            "Hematologic support protocol"
                        ],
                        [
                            "CASE_007",
                            "SUBJ_015",
                            "Dyspnea",
                            "Unlikely",
                            "Fatal",
                            "Serious Unrelated",
                            "Causality reassessment"
                        ],
                        [
                            "CASE_008",
                            "SUBJ_017",
                            "Diarrhea",
                            "Definite",
                            "Recovered",
                            "Serious Related",
                            "Dose modification algorithm"
                        ],
                        [
                            "CASE_023",
                            "SUBJ_028",
                            "Pneumonia",
                            "Possible",
                            "Recovered",
                            "Serious Related",
                            "Infection prophylaxis review"
                        ]
                    ],
                    "formatting": {
                        "highlight_rows": [
                            0,
                            1,
                            2
                        ],
                        "color_code_column": "Regulatory Class"
                    }
                }
            },
            "summary": "Analysis of safety data reveals critical hepatotoxicity signals affecting 25.4% of subjects with probable drug causality, alongside a 15.46% withdrawal rate driven primarily by adverse events. The data shows 80.96% of safety cases are drug-related (Probable + Possible), with hepatotoxicity (Elevated ALT + Hepatotoxicity) and hematologic toxicities (Neutropenia + Thrombocytopenia) representing the most significant safety risks. While oncology subjects comprise 11.34% of the study population, the perfect correlation between serious unrelated events and fatal outcomes suggests potential causality assessment bias requiring immediate review. Enhanced monitoring protocols for hepatotoxicity, hematologic support algorithms, and independent causality review are critical for improving patient safety and reducing safety-driven study discontinuations.",
            "status": "success",
            "error": null
        },
        "regulatory": null,
        "quality": null
    },
    "supervisor_agent_summary": "Analysis of oncology studies reveals a complex picture where enrollment performance is generally strong with 92% average retention rates (exceeding the 85% industry benchmark), but safety concerns present significant challenges. Enrollment data shows 910 total screened subjects with 540 enrolled (59.3% conversion rate), with STUDY_001 dominating activity (62.5% of screening volume). However, the safety profile reveals critical concerns: 25.4% of adverse events are hepatotoxicity-related with probable drug causality, and 80.96% of all safety cases are drug-related. The 15.46% withdrawal rate, while below the 20% benchmark, is primarily driven by adverse events including hepatotoxicity, hematologic toxicities (neutropenia, thrombocytopenia), and gastrointestinal symptoms. Key findings indicate that while dropout rates are not exceptionally high from an enrollment perspective, the underlying safety-driven discontinuations represent a significant quality concern requiring enhanced monitoring protocols, particularly for liver function and hematologic parameters, to maintain the current acceptable retention levels.",
    "status": "success",
    "error": null
}