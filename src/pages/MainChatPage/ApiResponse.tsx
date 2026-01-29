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
    "domain_agents_called": ["clinical", "patient_safety"],
    "routing_decision": "Query spans multiple domains: clinical agent for enrollment performance analysis and patient safety agent for safety profile analysis. Both domains are required to provide a comprehensive comparison of enrollment and safety data for oncology studies with high dropout rates."
  },
  "domain_results": {
    "clinical": {
      "query_understanding": {
        "original_query": "Show enrollment performance for oncology studies with high dropout rates",
        "query_type": "diagnostic",
        "data_sources_needed": [
          "studies",
          "sites",
          "subjects",
          "enrollment data",
          "dropout/discontinuation data"
        ],
        "analysis_scope": "portfolio-level analysis across multiple oncology studies",
        "specific_questions": [
          "Which oncology studies have high dropout rates?",
          "What is the enrollment performance for those studies?",
          "How do enrollment and dropout rates correlate?",
          "Which sites or studies need intervention?"
        ],
        "pattern_matched": "Enrollment and Screening Analysis Pattern"
      },
      "sql_query": "SELECT _\nFROM study_recruitment recruitment\nLEFT JOIN study study ON recruitment.study_id = study.study_id\nLEFT JOIN study_site site ON recruitment.site_id = site.site_id\nLEFT JOIN study_subject_demographics demographics ON recruitment.study_id = demographics.study_id AND recruitment.site_id = demographics.site_id\nLEFT JOIN study_feasibility feasibility ON recruitment.study_id = feasibility.study_id AND recruitment.site_id = feasibility.site_id\nWHERE \n (study.therapeutic_area = 'Oncology')\n OR \n (recruitment.study_id IN ('STUDY_001', 'STUDY_002', 'STUDY_003', 'STUDY_004', 'STUDY_005', 'STUDY_006', 'STUDY_007', 'STUDY_008', 'STUDY_009', 'STUDY_010'))\n OR\n (recruitment.retention_rate < 0.8)\nLIMIT 1000",
      "query_execution": {
        "statusCode": 200,
        "queryId": "ab9b7910-aeeb-403e-a76a-8ea062b194d8",
        "total_rows": 31,
        "s3_location": "s3://clinical-develpoment-assistant-bucket/clinical_curated/athena_result/ab9b7910-aeeb-403e-a76a-8ea062b194d8.csv",
        "preview_rows": [
          {
            "recruitment_id": "REC_001",
            "study_id": "STUDY_001",
            "site_id": "SITE_001",
            "screened_count": "52",
            "enrolled_count": "40",
            "retention_rate": "0.92",
            "therapeutic_area": "Oncology",
            "study_phase": "Phase I/II"
          },
          {
            "recruitment_id": "REC_002",
            "study_id": "STUDY_001",
            "site_id": "SITE_002",
            "screened_count": "38",
            "enrolled_count": "30",
            "retention_rate": "0.88",
            "therapeutic_area": "Oncology",
            "study_phase": "Phase I/II"
          },
          {
            "recruitment_id": "REC_014",
            "study_id": null,
            "site_id": null,
            "screened_count": "18",
            "enrolled_count": "12",
            "retention_rate": "0.97",
            "therapeutic_area": "Oncology",
            "study_phase": "Phase III"
          }
        ]
      },
      "analysis_results": {
        "questions_answered": [
          {
            "question": "Which oncology studies have high dropout rates?",
            "answer": "Oncology studies show varying retention rates, with the lowest being 88% retention at SITE_002. While not extremely high dropout, there is room for improvement compared to the best performing sites at 97% retention.",
            "supporting_data": {
              "oncology_retention_range": "88% - 97%",
              "total_oncology_records": 10,
              "lowest_retention_site": "SITE_002 (88%)",
              "highest_retention_site": "SITE_004 (94%)"
            },
            "severity": "medium"
          },
          {
            "question": "What is the enrollment performance for those studies?",
            "answer": "Oncology studies have enrolled 334 patients from 437 screened (76.4% screening success). Phase I/II studies show 232 screened with higher retention rates, while Phase III studies have lower volumes but good efficiency.",
            "supporting_data": {
              "total_screened_oncology": 437,
              "total_enrolled_oncology": 334,
              "screening_success_rate": "76.4%",
              "phase_distribution": "Phase II: 58%, Phase III: 19%, Phase I/II: 16%"
            },
            "severity": "normal"
          },
          {
            "question": "How do enrollment and dropout rates correlate?",
            "answer": "Higher volume screening sites (SITE_001: 52 screened) tend to have higher retention rates (92%), while smaller volume sites show more variation. SITE_002 has good volume (38 screened) but lower retention (88%).",
            "supporting_data": {
              "site_correlation": "Volume and retention show positive correlation",
              "highest_volume_site": "SITE_001 (52 screened, 92% retention)",
              "concerning_site": "SITE_002 (38 screened, 88% retention)"
            },
            "severity": "medium"
          },
          {
            "question": "Which sites or studies need intervention?",
            "answer": "SITE_002 shows the lowest retention rate (88%) in oncology studies and requires immediate attention. Focus on understanding root causes of higher dropout at this site.",
            "supporting_data": {
              "priority_site": "SITE_002",
              "retention_gap": "6% below top performer",
              "recommended_action": "Site-specific dropout analysis"
            },
            "severity": "high"
          }
        ],
        "key_metrics": {
          "oncology_retention_rate": {
            "value": 92,
            "unit": "%",
            "benchmark": "≥90%",
            "status": "good",
            "context": "Oncology studies showing strong overall retention despite complex patient population"
          },
          "screening_to_enrollment_rate": {
            "value": 76.4,
            "unit": "%",
            "benchmark": "≥75%",
            "status": "good",
            "context": "Screening efficiency meets benchmark for oncology trials"
          },
          "site_performance_variance": {
            "value": 6,
            "unit": "percentage points",
            "benchmark": "≤5%",
            "status": "concerning",
            "context": "6% difference between best (94%) and worst (88%) performing sites exceeds acceptable variance"
          },
          "phase_distribution": {
            "value": 58,
            "unit": "% Phase II studies",
            "benchmark": "balanced portfolio",
            "status": "normal",
            "context": "Appropriate focus on Phase II development in oncology pipeline"
          }
        },
        "top_findings": [
          {
            "rank": 1,
            "entity": "SITE_002",
            "entity_type": "site",
            "primary_metric": "retention_rate",
            "value": 0.88,
            "impact": "12% dropout rate affecting study timelines and sample size",
            "severity": "high"
          },
          {
            "rank": 2,
            "entity": "Oncology Portfolio",
            "entity_type": "therapeutic_area",
            "primary_metric": "volume_leadership",
            "value": 32.26,
            "impact": "Highest enrollment volume but needs retention optimization",
            "severity": "medium"
          },
          {
            "rank": 3,
            "entity": "Phase II Studies",
            "entity_type": "study_phase",
            "primary_metric": "screening_volume",
            "value": 745,
            "impact": "Majority of screening activity concentrated in Phase II",
            "severity": "low"
          }
        ],
        "correlations_found": [
          {
            "factor_1": "screening_volume",
            "factor_2": "retention_rate",
            "relationship": "Higher volume sites tend to have better retention rates",
            "strength": "moderate",
            "implication": "Site experience and infrastructure impact patient retention"
          },
          {
            "factor_1": "therapeutic_area",
            "factor_2": "retention_rate",
            "relationship": "Oncology shows good retention despite complexity",
            "strength": "strong",
            "implication": "Oncology protocols and patient management are effective"
          }
        ]
      },
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct immediate dropout analysis at SITE_002",
          "rationale": "88% retention rate is 6 percentage points below top performers, indicating systematic issues",
          "expected_impact": "Improve retention rate to 92-94% reducing dropout by 4-6%",
          "timeline": "Within 2 weeks",
          "responsible_party": "Site Management Team"
        },
        {
          "priority": "medium",
          "action": "Implement best practices from SITE_001 and SITE_004 across all oncology sites",
          "rationale": "Top performing sites show 92-94% retention rates with proven methodologies",
          "expected_impact": "Standardize retention rates to 92%+ across all sites",
          "timeline": "Within 1 month",
          "responsible_party": "Clinical Operations"
        },
        {
          "priority": "medium",
          "action": "Enhance screening criteria optimization for Phase II studies",
          "rationale": "Phase II studies represent 58% of volume with opportunity to improve screening efficiency",
          "expected_impact": "Increase screening-to-enrollment rate from 76.4% to 80%+",
          "timeline": "Next protocol amendment cycle",
          "responsible_party": "Clinical Development"
        },
        {
          "priority": "low",
          "action": "Establish retention rate monitoring dashboard for real-time tracking",
          "rationale": "Proactive monitoring prevents retention issues from escalating",
          "expected_impact": "Early identification of retention trends enabling rapid intervention",
          "timeline": "Within 6 weeks",
          "responsible_party": "Data Management"
        }
      ],
      "visualizations": {
        "primary_chart": {
          "chart_type": "bar_chart",
          "title": "Retention Rates by Therapeutic Area - Oncology Focus",
          "description": "Shows retention performance across therapeutic areas, highlighting oncology studies and identifying areas needing attention",
          "x_axis": {
            "label": "Therapeutic Area",
            "values": [
              "Autoimmune",
              "Oncology",
              "Neurology",
              "Gastroenterology",
              "Respiratory",
              "Nephrology",
              "Hematology",
              "Diabetes"
            ]
          },
          "y_axis": {
            "label": "Retention Rate (%)",
            "values": [98, 92, 92, 92, 91, 89, 89, 87]
          },
          "data_series": [
            {
              "name": "Retention Rate",
              "data": [98, 92, 92, 92, 91, 89, 89, 87],
              "color": [
                "green",
                "orange",
                "green",
                "green",
                "green",
                "yellow",
                "yellow",
                "red"
              ]
            }
          ],
          "benchmark_line": {
            "value": 90,
            "label": "Target Retention Rate (90%)"
          },
          "color_coding": {
            "green": "≥92% retention (excellent)",
            "yellow": "89-91% retention (acceptable)",
            "orange": "92% retention (oncology - good but monitor)",
            "red": "<89% retention (needs intervention)"
          },
          "key_insight": "Oncology maintains 92% retention rate, performing well above benchmark despite patient complexity. Diabetes studies show lowest retention at 87%."
        },
        "secondary_chart": {
          "chart_type": "scatter_plot",
          "title": "Screening Volume vs Retention Rate by Site",
          "description": "Correlation analysis showing relationship between site screening volume and patient retention performance",
          "data": {
            "x_axis": [52, 38, 58],
            "y_axis": [0.92, 0.88, 0.94],
            "labels": ["SITE_001", "SITE_002", "SITE_004"],
            "colors": ["green", "red", "green"]
          },
          "key_insight": "Higher volume sites generally show better retention, but SITE_002 is an outlier requiring immediate attention."
        },
        "data_table": {
          "title": "Oncology Study Performance Summary",
          "headers": [
            "Study Phase",
            "Records",
            "% of Portfolio",
            "Avg Screened",
            "Retention Rate"
          ],
          "rows": [
            ["Phase II", "18", "58.0%", "41.4", "91-97%"],
            ["Phase III", "6", "19.4%", "37.0", "89-97%"],
            ["Phase I/II", "5", "16.1%", "46.4", "88-92%"],
            ["Phase I", "2", "6.5%", "25.0", "93%"]
          ],
          "formatting": {
            "highlight_rows": [0],
            "color_code_column": "Retention Rate"
          }
        }
      },
      "summary": "Oncology studies demonstrate strong overall enrollment performance with 334 patients enrolled from 437 screened (76.4% success rate) and 92% retention rate. However, site-level analysis reveals significant performance variance, with SITE_002 showing concerning 88% retention compared to top performers at 94%. Phase II studies dominate the portfolio (58%) with good screening volumes. Immediate intervention needed at underperforming sites, particularly SITE_002, to standardize retention rates across the oncology program.",
      "status": "success",
      "error": null
    },
    "patient_safety": {
      "query_understanding": {
        "original_query": "Show safety profile for oncology studies with high dropout rates",
        "query_type": "safety_signal",
        "data_sources_needed": [
          "study subjects",
          "medical history",
          "adverse events",
          "dose modifications",
          "consent withdrawals"
        ],
        "analysis_scope": "portfolio",
        "specific_questions": [
          "What safety events are most common in oncology studies with high dropout rates?",
          "Are there specific adverse events driving study discontinuations?",
          "What is the severity profile of safety events in high-dropout oncology studies?"
        ],
        "pattern_matched": "Subject Safety Profile Pattern"
      },
      "sql_query": "SELECT _ FROM study_subject_medical_history history LEFT JOIN drug_dosage dosage ON history.study_id = dosage.study_id LEFT JOIN safety_case scase ON history.subject_id = scase.subject_id LEFT JOIN subject_consent consent ON history.subject_id = consent.subject_id LEFT JOIN adverse_event event ON scase.case_id = event.case_id WHERE ((history.condition_name LIKE '%cancer%' OR history.condition_name LIKE '%oncol%' OR history.condition_name LIKE '%tumor%' OR history.condition_name LIKE '%malign%' OR history.condition_category LIKE '%oncol%')) OR ((consent.withdrawal_reason IS NOT NULL OR consent.consent_status = 'Withdrawn' OR dosage.dose_modification_reason LIKE '%discontinu%' OR dosage.dose_modification_reason LIKE '%withdraw%')) OR ((history.subject_id IN ('SUBJ_001', 'SUBJ_002', 'SUBJ_003', 'SUBJ_004', 'SUBJ_005', 'SUBJ_006', 'SUBJ_007', 'SUBJ_008', 'SUBJ_009', 'SUBJ_010') OR history.study_id IN ('STUDY_001', 'STUDY_002', 'STUDY_003', 'STUDY_004', 'STUDY_005', 'STUDY_006', 'STUDY_007', 'STUDY_008', 'STUDY_009', 'STUDY_010'))) LIMIT 1000",
      "query_execution": {
        "statusCode": 200,
        "queryId": "be938226-f8b1-4b78-bf98-59305eb16166",
        "total_rows": 118,
        "s3_location": "s3://clinical-develpoment-assistant-bucket/clinical_curated/athena_result/be938226-f8b1-4b78-bf98-59305eb16166.csv",
        "preview_rows": [
          {
            "medical_history_id": "MH_001",
            "study_id": "STUDY_001",
            "subject_id": "SUBJ_001",
            "condition_name": "Hypertension",
            "condition_category": "Cardiovascular",
            "dose_modification_reason": "Continued at Reduced Dose",
            "withdrawal_reason": null
          },
          {
            "medical_history_id": "MH_018",
            "study_id": "STUDY_004",
            "subject_id": "SUBJ_011",
            "condition_name": "Breast Cancer",
            "condition_category": "Oncologic",
            "dose_modification_reason": "Continued at Reduced Dose",
            "withdrawal_reason": null
          },
          {
            "medical_history_id": "MH_023",
            "study_id": "STUDY_006",
            "subject_id": "SUBJ_015",
            "condition_name": "Melanoma",
            "condition_category": "Oncologic",
            "dose_modification_reason": "Discontinued - Disease Progression",
            "withdrawal_reason": "Lack of Efficacy"
          }
        ]
      },
      "analysis_results": {
        "questions_answered": [
          {
            "question": "What safety events are most common in oncology studies with high dropout rates?",
            "answer": "40% of study withdrawals are due to adverse events, with dose modifications being the primary safety response (18.7% continued at reduced dose)",
            "supporting_data": {
              "oncology_conditions": "12 oncologic conditions (10.17% of total medical history)",
              "dose_modifications": "75 total dose modifications with safety-related reasons",
              "withdrawal_patterns": "15 withdrawals total, 6 due to adverse events"
            },
            "severity": "high"
          },
          {
            "question": "Are there specific adverse events driving study discontinuations?",
            "answer": "Grade 3 diarrhea (13.3%), Grade 2 fatigue (8%), and neutropenia (6.7%) are leading causes of dose modifications",
            "supporting_data": {
              "top_modifications": "Dose interruption/reduction for toxicity management",
              "causality_assessment": "53.5% of safety cases have 'Probable' drug relationship"
            },
            "severity": "high"
          },
          {
            "question": "What is the severity profile of safety events in high-dropout oncology studies?",
            "answer": "High drug-related safety signal with 76.5% of cases having Probable/Definite causality, indicating significant safety concerns in oncology studies",
            "supporting_data": {
              "causality_breakdown": "Probable: 53.5%, Possible: 23.9%, Definite: 8.5%",
              "safety_management": "Multiple dose reductions and interruptions required"
            },
            "severity": "critical"
          }
        ],
        "key_metrics": {
          "withdrawal_rate_due_to_aes": {
            "value": 40.0,
            "unit": "%",
            "benchmark": "15-25%",
            "status": "critical",
            "context": "Withdrawal rate due to adverse events is significantly above acceptable threshold"
          },
          "oncology_conditions": {
            "value": 10.17,
            "unit": "%",
            "benchmark": "varies",
            "status": "concerning",
            "context": "Significant presence of oncology conditions in the safety dataset"
          },
          "dose_modifications": {
            "value": 63.6,
            "unit": "%",
            "benchmark": "30-40%",
            "status": "critical",
            "context": "High rate of dose modifications indicating tolerability issues"
          },
          "drug_related_events": {
            "value": 76.5,
            "unit": "%",
            "benchmark": "40-60%",
            "status": "critical",
            "context": "High proportion of safety events with probable/definite drug relationship"
          }
        },
        "top_findings": [
          {
            "rank": 1,
            "entity": "Grade 3 Diarrhea",
            "entity_type": "adverse_event",
            "primary_metric": "dose_interruption_rate",
            "value": 13.3,
            "impact": "Leading cause of dose interruptions requiring immediate management",
            "severity": "critical"
          },
          {
            "rank": 2,
            "entity": "Cardiovascular Conditions",
            "entity_type": "condition_category",
            "primary_metric": "condition_prevalence",
            "value": 20.3,
            "impact": "Most common comorbidity category affecting safety profile",
            "severity": "high"
          },
          {
            "rank": 3,
            "entity": "Probable Drug Causality",
            "entity_type": "causality_rating",
            "primary_metric": "causality_percentage",
            "value": 53.5,
            "impact": "Over half of safety cases have probable drug relationship",
            "severity": "critical"
          }
        ],
        "safety_signals": [
          {
            "signal_type": "High withdrawal rate due to adverse events",
            "description": "40% of withdrawals are adverse event related, indicating poor tolerability profile",
            "strength": "strong",
            "recommendation": "Implement enhanced safety monitoring and dose optimization strategies"
          },
          {
            "signal_type": "Gastrointestinal toxicity pattern",
            "description": "Grade 3 diarrhea is the leading cause of dose interruptions across studies",
            "strength": "strong",
            "recommendation": "Develop proactive GI toxicity management protocols"
          },
          {
            "signal_type": "Oncology patient vulnerability",
            "description": "Oncology patients showing increased susceptibility to treatment-related adverse events",
            "strength": "moderate",
            "recommendation": "Consider oncology-specific safety monitoring and dose modification guidelines"
          }
        ]
      },
      "recommendations": [
        {
          "priority": "critical",
          "action": "Implement comprehensive safety monitoring dashboard for oncology studies",
          "rationale": "40% AE-related withdrawal rate requires immediate enhanced monitoring",
          "expected_impact": "Reduce withdrawals by 25-30% through early intervention",
          "timeline": "Immediate - within 2 weeks",
          "responsible_party": "Safety Team & Study Teams"
        },
        {
          "priority": "high",
          "action": "Develop GI toxicity management protocol with prophylactic measures",
          "rationale": "Grade 3 diarrhea is leading cause of dose interruptions (13.3%)",
          "expected_impact": "Reduce Grade 3 GI events by 40-50%",
          "timeline": "Within 4 weeks",
          "responsible_party": "Medical Affairs & Safety"
        },
        {
          "priority": "high",
          "action": "Review dose escalation strategies for oncology studies",
          "rationale": "High rate of dose modifications (63.6%) suggests starting doses may be too aggressive",
          "expected_impact": "Improve tolerability while maintaining efficacy",
          "timeline": "Within 6 weeks",
          "responsible_party": "Clinical Development & Biostatistics"
        },
        {
          "priority": "medium",
          "action": "Enhance pre-screening for cardiovascular comorbidities",
          "rationale": "Cardiovascular conditions represent 20.3% of medical history and may influence safety",
          "expected_impact": "Better risk stratification and personalized dosing",
          "timeline": "Within 8 weeks",
          "responsible_party": "Clinical Operations"
        }
      ],
      "visualizations": {
        "primary_chart": {
          "chart_type": "stacked_bar",
          "title": "Safety Profile Analysis: Withdrawal Reasons vs Dose Modifications",
          "description": "This chart shows the relationship between withdrawal reasons and dose modification patterns, highlighting safety-driven discontinuations",
          "x_axis": {
            "label": "Study Discontinuation Management",
            "values": [
              "Adverse Event Withdrawals",
              "Dose Modifications",
              "Other Withdrawals",
              "Continued Treatment"
            ]
          },
          "y_axis": {
            "label": "Number of Subjects",
            "values": [6, 75, 9, 28]
          },
          "data_series": [
            {
              "name": "Critical Safety Events",
              "data": [6, 35, 2, 0],
              "color": "#FF4444"
            },
            {
              "name": "Manageable Toxicity",
              "data": [0, 40, 0, 20],
              "color": "#FFA500"
            },
            {
              "name": "Non-Safety Related",
              "data": [0, 0, 7, 8],
              "color": "#4CAF50"
            }
          ],
          "benchmark_line": {
            "value": 15,
            "label": "Acceptable AE withdrawal threshold"
          },
          "color_coding": {
            "red": "Critical safety issues requiring immediate action",
            "orange": "Manageable toxicity with dose adjustments",
            "green": "Acceptable safety profile"
          },
          "key_insight": "40% of withdrawals are AE-related, significantly above the 15-25% acceptable threshold"
        },
        "secondary_chart": {
          "chart_type": "bar_chart",
          "title": "Top Safety Events by Condition Category",
          "description": "Distribution of medical conditions and their association with safety events in the oncology studies",
          "x_axis": {
            "label": "Condition Categories",
            "values": [
              "Cardiovascular",
              "Musculoskeletal",
              "Oncologic",
              "Endocrine",
              "Neurological"
            ]
          },
          "y_axis": {
            "label": "Count of Conditions",
            "values": [24, 18, 12, 12, 11]
          },
          "data_series": [
            {
              "name": "Medical History Conditions",
              "data": [24, 18, 12, 12, 11],
              "color": ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"]
            }
          ],
          "key_insight": "Cardiovascular comorbidities are most prevalent (20.3%), potentially contributing to safety complexity"
        },
        "data_table": {
          "title": "Critical Safety Metrics Summary",
          "headers": ["Metric", "Value", "Status", "Action Required"],
          "rows": [
            [
              "AE Withdrawal Rate",
              "40.0%",
              "Critical",
              "Immediate monitoring enhancement"
            ],
            [
              "Dose Modification Rate",
              "63.6%",
              "Critical",
              "Review dose strategies"
            ],
            [
              "Drug-Related Events",
              "76.5%",
              "Critical",
              "Enhanced causality assessment"
            ],
            ["Grade 3+ GI Events", "13.3%", "High", "Prophylactic GI protocol"],
            [
              "Oncology Conditions",
              "10.2%",
              "Concerning",
              "Specialized monitoring"
            ]
          ],
          "formatting": {
            "highlight_rows": [0, 1, 2],
            "color_code_column": "Status"
          }
        }
      },
      "summary": "The safety profile for oncology studies shows concerning patterns with a 40% adverse event-related withdrawal rate - significantly above acceptable thresholds. Key findings include: (1) Grade 3 diarrhea driving 13.3% of dose interruptions, (2) 76.5% of safety cases having probable/definite drug causality, and (3) cardiovascular comorbidities present in 20.3% of subjects. The high dose modification rate (63.6%) suggests tolerability issues requiring immediate intervention through enhanced monitoring, proactive GI management, and dose optimization strategies. Oncology patients demonstrate increased vulnerability to treatment-related adverse events, necessitating specialized safety protocols and closer monitoring to reduce the unacceptably high dropout rates while maintaining therapeutic efficacy.",
      "status": "success",
      "error": null
    },
    "regulatory": null,
    "quality": null
  },
  "status": "success",
  "error": null
}
