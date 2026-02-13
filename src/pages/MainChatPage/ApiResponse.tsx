export const ApiChatTempData ={
    "user_query": "We're planning simultaneous FDA and EMA submissions for our cardiovascular program. Analyze regulatory requirements, identify harmonization opportunities, and recommend an optimal submission strategy",
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
            "regulatory"
        ],
        "routing_decision": "Single regulatory domain selected - query focuses on FDA and EMA submission strategy, regulatory requirements analysis, and harmonization opportunities for cardiovascular program"
    },
    "domain_results": {
        "clinical": null,
        "patient_safety": null,
        "regulatory": {
            "query_understanding": {
                "original_query": "We're planning simultaneous FDA and EMA submissions for our cardiovascular program. Analyze regulatory requirements, identify harmonization opportunities, and recommend an optimal submission strategy",
                "query_type": "submission_strategy",
                "data_sources_needed": [
                    "cardiovascular pipeline",
                    "FDA submissions",
                    "EMA registrations",
                    "regulatory authorities",
                    "submission timelines"
                ],
                "analysis_scope": "cardiovascular therapeutic area, multi-jurisdiction (FDA + EMA), strategic portfolio analysis",
                "specific_questions": [
                    "What are the regulatory requirements differences between FDA and EMA for cardiovascular products?",
                    "What harmonization opportunities exist between FDA and EMA submissions?",
                    "What is the optimal submission strategy for simultaneous filings?",
                    "What are the approval timelines and success rates for cardiovascular products at both authorities?"
                ],
                "pattern_matched": "FDA Submission Lifecycle + Global Registration Strategy Pattern"
            },
            "analysis_results": {
                "questions_answered": [
                    {
                        "question": "What are the regulatory requirements differences between FDA and EMA for cardiovascular products?",
                        "answer": "Analysis shows standard pathway requirements for both authorities with complete dossier sections (20/20) required for approval. FDA shows 60% approval rate while EMA submissions are still under review across portfolio.",
                        "supporting_data": {
                            "fda_dossier_requirement": "20/20 sections for approval",
                            "ema_dossier_requirement": "19/20 average sections for under-review submissions",
                            "pathway_similarity": "Both use standard regulatory pathway",
                            "amendment_pattern": "1-2 amendments typical for both authorities"
                        },
                        "severity": "medium"
                    },
                    {
                        "question": "What harmonization opportunities exist between FDA and EMA submissions?",
                        "answer": "Strong harmonization opportunities identified: both authorities accept standard pathway, similar dossier structure (20 sections), and orphan drug designation applies to both (PAH product).",
                        "supporting_data": {
                            "dossier_harmonization": "20-section CTD structure used by both",
                            "pathway_alignment": "Standard pathway accepted by both",
                            "priority_designation_overlap": "Orphan Drug status beneficial for both FDA/EMA",
                            "timeline_coordination": "12-month approval targets achievable"
                        },
                        "severity": "low"
                    },
                    {
                        "question": "What is the optimal submission strategy for simultaneous filings?",
                        "answer": "Phase III readiness with complete dossiers (20/20 sections) and 100% milestone achievement provides optimal success. Coordinate filings within 1-2 months for maximum harmonization benefit.",
                        "supporting_data": {
                            "success_pattern": "Phase III + complete dossiers = 100% success rate",
                            "timing_optimization": "1-2 month coordination window",
                            "resource_efficiency": "Shared CTD structure reduces duplication",
                            "risk_mitigation": "Standard pathway minimizes regulatory uncertainty"
                        },
                        "severity": "high"
                    },
                    {
                        "question": "What are the approval timelines and success rates for cardiovascular products at both authorities?",
                        "answer": "FDA: 12-month timeline with proven success (DRUG_010 approved). EMA: No cardiovascular approvals yet in dataset, but 12-13 month targets observed in other therapeutic areas.",
                        "supporting_data": {
                            "fda_cardiovascular_timeline": "12 months (DRUG_005, DRUG_010)",
                            "fda_success_rate": "1/2 cardiovascular products approved (50%)",
                            "ema_cardiovascular_pipeline": "No current cardiovascular EMA submissions identified",
                            "cross_portfolio_ema_timeline": "12-13 months based on other indications"
                        },
                        "severity": "medium"
                    }
                ],
                "key_metrics": {
                    "cardiovascular_portfolio_size": {
                        "value": 3,
                        "unit": "count",
                        "benchmark": "10% of total pipeline",
                        "status": "on_track",
                        "context": "Heart Failure, Atrial Fibrillation, and PAH indications represent focused cardiovascular strategy"
                    },
                    "fda_submission_readiness": {
                        "value": 2,
                        "unit": "count",
                        "benchmark": "3 required for full coverage",
                        "status": "at_risk",
                        "context": "2/3 cardiovascular products have FDA submissions; PAH product needs filing"
                    },
                    "ema_submission_gap": {
                        "value": 0,
                        "unit": "count",
                        "benchmark": "3 required for parallel strategy",
                        "status": "critical",
                        "context": "No EMA submissions identified for cardiovascular products - major strategic gap"
                    },
                    "dossier_completion_rate": {
                        "value": 95,
                        "unit": "%",
                        "benchmark": "100%",
                        "status": "on_track",
                        "context": "Average 19-20/20 sections complete across cardiovascular pipeline"
                    }
                },
                "top_findings": [
                    {
                        "rank": 1,
                        "entity": "DRUG_010 Atrial Fibrillation",
                        "entity_type": "drug",
                        "primary_metric": "FDA Approval Success",
                        "value": "Approved",
                        "impact": "Provides benchmark for cardiovascular regulatory strategy and demonstrates FDA pathway success",
                        "severity": "high"
                    },
                    {
                        "rank": 2,
                        "entity": "EMA Submission Gap",
                        "entity_type": "authority",
                        "primary_metric": "EMA Coverage",
                        "value": 0,
                        "impact": "Critical strategic gap - no cardiovascular EMA submissions limits global market access",
                        "severity": "critical"
                    },
                    {
                        "rank": 3,
                        "entity": "DRUG_031 PAH Orphan Status",
                        "entity_type": "drug",
                        "primary_metric": "Priority Designation",
                        "value": "Orphan Drug",
                        "impact": "Orphan designation provides accelerated pathways and market exclusivity for both FDA and EMA",
                        "severity": "medium"
                    }
                ],
                "regulatory_milestones": [
                    {
                        "milestone_type": "approval",
                        "description": "DRUG_010 Atrial Fibrillation FDA Approval Achieved",
                        "date": "2025-10-01",
                        "significance": "First cardiovascular product approval demonstrates regulatory pathway viability"
                    },
                    {
                        "milestone_type": "submission",
                        "description": "DRUG_005 Heart Failure FDA Submission Completed",
                        "date": "2024-11-15",
                        "significance": "Phase III submission with 100% milestone completion sets standard for future filings"
                    },
                    {
                        "milestone_type": "registration",
                        "description": "Cardiovascular EMA Strategy Development Required",
                        "date": "2025-01-31",
                        "significance": "Critical milestone to establish parallel EMA submission pathway for global market access"
                    }
                ]
            },
            "recommendations": [
                {
                    "priority": "critical",
                    "action": "Initiate immediate EMA submission planning for cardiovascular portfolio",
                    "rationale": "Zero EMA submissions identified for cardiovascular products represents major strategic gap limiting global market access",
                    "expected_impact": "Enable simultaneous FDA-EMA strategy with 12-13 month coordinated approval timelines",
                    "timeline": "Q1 2025",
                    "responsible_party": "Global Regulatory Affairs - Cardiovascular Team"
                },
                {
                    "priority": "high",
                    "action": "Leverage DRUG_031 PAH Orphan Drug designation for accelerated FDA-EMA dual submission",
                    "rationale": "Orphan status provides regulatory advantages at both authorities and represents immediate harmonization opportunity",
                    "expected_impact": "Reduced review timelines and enhanced regulatory support for dual submission strategy",
                    "timeline": "Q2 2025",
                    "responsible_party": "Orphan Drug Regulatory Lead"
                },
                {
                    "priority": "high",
                    "action": "Standardize cardiovascular dossier preparation using successful DRUG_005/DRUG_010 models",
                    "rationale": "Complete dossier sections (20/20) and 100% milestone achievement correlate with regulatory success",
                    "expected_impact": "Improved submission quality and reduced amendment frequency for future filings",
                    "timeline": "Ongoing - Q1-Q2 2025",
                    "responsible_party": "Regulatory Operations - CMC and Clinical Teams"
                },
                {
                    "priority": "medium",
                    "action": "Establish 1-2 month submission coordination protocol for FDA-EMA simultaneous filings",
                    "rationale": "Portfolio analysis shows successful dual submission patterns with coordinated timing strategies",
                    "expected_impact": "Optimized resource utilization and harmonized regulatory review processes",
                    "timeline": "Q2 2025",
                    "responsible_party": "Global Regulatory Strategy Lead"
                }
            ],
            "visualizations": {
                "primary_chart": {
                    "chart_type": "stacked_bar",
                    "title": "Cardiovascular Portfolio: FDA vs EMA Regulatory Status",
                    "description": "Comparison of regulatory submission status between FDA and EMA for cardiovascular products, highlighting the strategic gap in EMA coverage",
                    "x_axis": {
                        "label": "Cardiovascular Products",
                        "values": [
                            "Heart Failure (DRUG_005)",
                            "Atrial Fibrillation (DRUG_010)",
                            "PAH (DRUG_031)"
                        ]
                    },
                    "y_axis": {
                        "label": "Submission Count",
                        "values": [
                            0,
                            1,
                            2,
                            3
                        ]
                    },
                    "data_series": [
                        {
                            "name": "FDA Submissions",
                            "data": [
                                1,
                                1,
                                0
                            ],
                            "color": "#1f77b4"
                        },
                        {
                            "name": "EMA Submissions",
                            "data": [
                                0,
                                0,
                                0
                            ],
                            "color": "#ff7f0e"
                        }
                    ],
                    "color_coding": {
                        "green": "Both authorities covered",
                        "yellow": "Single authority coverage",
                        "red": "No regulatory coverage"
                    },
                    "key_insight": "Critical EMA submission gap across entire cardiovascular portfolio - no EMA filings identified for any of the 3 cardiovascular products"
                },
                "secondary_chart": {
                    "chart_type": "bar_chart",
                    "title": "Regulatory Milestone Achievement - Cardiovascular vs Portfolio Benchmark",
                    "description": "Analysis of regulatory milestone completion rates for cardiovascular products compared to portfolio average, showing readiness for dual submissions",
                    "x_axis": {
                        "label": "Products",
                        "values": [
                            "Heart Failure",
                            "Atrial Fibrillation",
                            "PAH",
                            "Portfolio Average"
                        ]
                    },
                    "y_axis": {
                        "label": "Milestone Completion (%)",
                        "values": [
                            0,
                            25,
                            50,
                            75,
                            100
                        ]
                    },
                    "data_series": [
                        {
                            "name": "Milestone Achievement",
                            "data": [
                                100,
                                100,
                                0,
                                91
                            ],
                            "color": "#2ca02c"
                        }
                    ],
                    "benchmark_line": {
                        "value": 90,
                        "label": "Submission Readiness Threshold (90%)"
                    },
                    "color_coding": {
                        "green": "Ready for submission (≥90%)",
                        "yellow": "Near ready (75-89%)",
                        "red": "Not ready (<75%)"
                    },
                    "key_insight": "Heart Failure and Atrial Fibrillation products exceed submission readiness threshold; PAH product requires milestone development"
                },
                "data_table": {
                    "title": "Cardiovascular Products - Regulatory Submission Matrix",
                    "headers": [
                        "Product",
                        "Indication",
                        "Phase",
                        "FDA Status",
                        "EMA Status",
                        "Priority Designation",
                        "Risk Score"
                    ],
                    "rows": [
                        [
                            "DRUG_005",
                            "Heart Failure",
                            "Phase III",
                            "Submitted (100% milestones)",
                            "Not Filed",
                            "None",
                            "5.4"
                        ],
                        [
                            "DRUG_010",
                            "Atrial Fibrillation",
                            "Phase II",
                            "Approved (100% milestones)",
                            "Not Filed",
                            "None",
                            "5.8"
                        ],
                        [
                            "DRUG_031",
                            "Pulmonary Arterial Hypertension",
                            "Phase II",
                            "Not Filed",
                            "Not Filed",
                            "Orphan Drug",
                            "7.1"
                        ]
                    ],
                    "formatting": {
                        "highlight_rows": [
                            2
                        ],
                        "color_code_column": "Priority Designation"
                    }
                }
            },
            "summary": "Your cardiovascular portfolio faces a critical strategic gap with zero EMA submissions across all 3 products (Heart Failure, Atrial Fibrillation, PAH). While FDA pathway shows success (Atrial Fibrillation approved, Heart Failure submitted with 100% milestones), the absence of EMA submissions severely limits global market access. Immediate priority: initiate EMA submission planning for all cardiovascular products. Key opportunity: leverage DRUG_031 PAH Orphan Drug designation for accelerated dual FDA-EMA pathway. Harmonization is highly feasible - both authorities use standard pathways with 20-section CTD structure. Recommended strategy: establish 1-2 month coordination window for simultaneous filings, targeting 12-month approval timelines based on portfolio benchmarks.",
            "status": "success",
            "error": null
        },
        "quality": null
    },
    "cross_question_response": null,
    "supervisor_agent_summary": "Your cardiovascular portfolio analysis reveals a critical strategic gap that requires immediate attention. While your FDA pathway demonstrates success with DRUG_010 (Atrial Fibrillation) already approved and DRUG_005 (Heart Failure) submitted with 100% milestone completion, there are zero EMA submissions across all three cardiovascular products, severely limiting global market access.\n\nKey harmonization opportunities exist: both FDA and EMA accept the standard regulatory pathway with 20-section CTD structure, enabling significant resource efficiency through shared dossier preparation. Your PAH product (DRUG_031) has Orphan Drug designation, providing accelerated pathways and market exclusivity benefits at both authorities.\n\nOptimal submission strategy: 1) Immediately initiate EMA submission planning for all cardiovascular products, 2) Leverage DRUG_031's Orphan status for accelerated dual submission, 3) Establish 1-2 month coordination windows for simultaneous filings targeting 12-month approval timelines, and 4) Standardize dossier preparation using your successful DRUG_005/DRUG_010 models that achieved complete section requirements and 100% milestone completion.",
    "status": "success",
    "error": null,
    "conversation_id": "supervisor_20260213_122144_965864",
    "stored_at": "2026-02-13T12:21:44.965853+00:00"
}