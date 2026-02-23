export const ApiChatTempData = {
  "userquery": "Show me all approved drugs in our oncology portfolio",
  domain_results: {
    clinical: {
      summary:
        "Your oncology portfolio contains 84 studies with 6 investigational drugs having complete treatment data (DRUG_014, DRUG_011, DRUG_036, DRUG_041, DRUG_038, DRUG_048). The portfolio shows strong maturity with 76% of studies in Phase II+ development stages. Total enrollment capacity exceeds 22,000 patients, with Phase III studies commanding 71% of capacity. However, a critical data gap exists - only 7% of studies have complete drug treatment information, limiting full portfolio visibility. The Phase II segment is particularly robust with 28 studies, positioning the portfolio well for future Phase III advancement. Immediate focus should be on completing drug data integration and implementing approval milestone tracking.",
      visualizations: {
        secondary_chart: {
          data_series: [
            {
              name: "Enrollment Capacity",
              data: [542, 394, 5012, 455, 15840],
              color: "#28B463",
            },
          ],
          color_coding: {
            yellow: "Phase II medium-capacity studies",
            red: "Phase I small-capacity studies",
            green: "Phase III high-capacity studies",
          },
          chart_type: "stacked_bar",
          y_axis: {
            label: "Patient Enrollment Capacity",
            values: [0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000],
          },
          x_axis: {
            label: "Development Phase",
            values: [
              "Phase I",
              "Phase I/II",
              "Phase II",
              "Phase II/III",
              "Phase III",
            ],
          },
          description:
            "Total patient enrollment capacity across oncology portfolio phases",
          key_insight:
            "Phase III studies represent 71% of total enrollment capacity (15,840 patients)",
          title: "Enrollment Capacity by Development Phase",
        },
        primary_chart: {
          benchmark_line: {
            value: 20,
            label: "Target Portfolio Balance (20 studies per phase)",
          },
          data_series: [
            { name: "Study Count", data: [12, 8, 28, 9, 27], color: "#2E86C1" },
          ],
          color_coding: {
            yellow: "Phase I/II studies (transition)",
            red: "Below target threshold",
            green: "Phase II/III studies (mature pipeline)",
          },
          chart_type: "bar_chart",
          y_axis: {
            label: "Number of Studies",
            values: [0, 5, 10, 15, 20, 25, 30],
          },
          x_axis: {
            label: "Development Phase",
            values: [
              "Phase I",
              "Phase I/II",
              "Phase II",
              "Phase II/III",
              "Phase III",
            ],
          },
          description:
            "Distribution of 84 oncology studies across development phases showing pipeline maturity",
          key_insight:
            "Phase II dominates with 28 studies (33%), indicating strong efficacy-stage focus",
          title: "Oncology Portfolio by Development Phase",
        },
        data_table: {
          headers: [
            "Drug ID",
            "Study ID",
            "Phase",
            "Treatment Arm",
            "Enrollment",
            "Primary Endpoint",
          ],
          title: "Active Oncology Drugs with Complete Data",
          rows: [
            [
              "DRUG_014",
              "STUDY_001",
              "Phase I/II",
              "Active Treatment",
              "46",
              "Maximum tolerated dose",
            ],
            [
              "DRUG_011",
              "STUDY_001",
              "Phase I/II",
              "Placebo Control",
              "46",
              "Maximum tolerated dose",
            ],
            [
              "DRUG_036",
              "STUDY_011",
              "Phase III",
              "Dose Escalation",
              "820",
              "Time to progression",
            ],
            [
              "DRUG_041",
              "STUDY_013",
              "Phase I",
              "Standard Therapy",
              "36",
              "Objective response rate",
            ],
            [
              "DRUG_038",
              "STUDY_013",
              "Phase I",
              "Induction Therapy",
              "36",
              "Objective response rate",
            ],
            [
              "DRUG_048",
              "STUDY_018",
              "Phase II",
              "Active Treatment",
              "212",
              "Duration of response",
            ],
          ],
          formatting: { highlight_rows: [2], color_code_column: "Phase" },
        },
      },
      query_understanding: {
        data_sources_needed: ["studies", "treatments", "milestones"],
        specific_questions: [
          "What drugs are in development?",
          "What is the phase distribution?",
          "What is the enrollment capacity?",
        ],
        original_query: "Show me all approved drugs in our oncology portfolio",
        query_type: "descriptive",
        analysis_scope: "oncology therapeutic area portfolio",
        pattern_matched: "drug_portfolio_analysis",
      },
      query_execution: {
        s3_location:
          "s3://clinical-develpoment-assistant-bucket/clinical_curated/athena_result/291bb4cb-fbf5-489f-a4ec-c652eb0a792c.csv",
        preview_rows: [
          {
            drug_id: "DRUG_014",
            study_id: "STUDY_001",
            therapeutic_area: "Oncology",
            study_phase: "Phase I/II",
            enrollment_target: "46",
          },
          {
            drug_id: "DRUG_036",
            study_id: "STUDY_011",
            therapeutic_area: "Oncology",
            study_phase: "Phase III",
            enrollment_target: "820",
          },
          {
            drug_id: "DRUG_041",
            study_id: "STUDY_013",
            therapeutic_area: "Oncology",
            study_phase: "Phase I",
            enrollment_target: "36",
          },
        ],
        statusCode: 200,
        queryId: "291bb4cb-fbf5-489f-a4ec-c652eb0a792c",
        total_rows: 134,
      },
      sql_query:
        "SELECT stud.study_id, stud.therapeutic_area, stud.study_phase, stud.primary_endpoint, stud.secondary_endpoints, stud.enrollment_target, trea.treatment_id, trea.drug_id, trea.treatment_arm, trea.blinding_status, ctms.milestone_name, ctms.planned_date, ctms.actual_date FROM study stud LEFT JOIN study_treatment trea ON stud.study_id = trea.study_id LEFT JOIN ctms_records ctms ON stud.study_id = ctms.study_id WHERE (stud.term_id IN ('ontology:ONT_036', 'clinical_term:TERM_007')) OR (stud.therapeutic_area = 'Oncology') OR (ctms.term_id IN ('ontology:ONT_036', 'clinical_term:TERM_007')) OR (ctms.milestone_name LIKE '%approved%' OR ctms.milestone_name LIKE '%approval%') LIMIT 1000",
      analysis_results: {
        top_findings: [
          {
            severity: "medium",
            primary_metric: "study_count",
            entity_type: "study",
            impact: "Largest segment representing efficacy focus",
            rank: 1,
            value: 28,
            entity: "Phase II Portfolio",
          },
          {
            severity: "low",
            primary_metric: "enrollment_target",
            entity_type: "study",
            impact: "Largest single study enrollment capacity",
            rank: 2,
            value: 1565,
            entity: "STUDY_735",
          },
          {
            severity: "critical",
            primary_metric: "missing_drug_data",
            entity_type: "issue",
            impact: "93% of studies missing drug treatment details",
            rank: 3,
            value: 93,
            entity: "Data Completeness Gap",
          },
        ],
        key_metrics: {
          enrollment_capacity: {
            context: "Strong enrollment capacity across all phases",
            unit: "patients",
            value: 22189,
            benchmark: "15000",
            status: "good",
          },
          total_oncology_studies: {
            context: "Robust portfolio size for therapeutic area",
            unit: "count",
            value: 84,
            benchmark: "50-100",
            status: "good",
          },
          data_completeness: {
            context: "Only 7% of studies have complete drug treatment data",
            unit: "%",
            value: 7,
            benchmark: "80%",
            status: "critical",
          },
          pipeline_maturity: {
            context: "76% of studies in Phase II+ indicating mature pipeline",
            unit: "%",
            value: 76,
            benchmark: "60%",
            status: "good",
          },
        },
        questions_answered: [
          {
            supporting_data: {
              active_studies_with_drugs: 4,
              data_completeness: "7%",
              total_studies: 84,
            },
            severity: "medium",
            question: "What drugs are currently in our oncology portfolio?",
            answer:
              "6 active investigational drugs with full treatment data: DRUG_014, DRUG_011, DRUG_036, DRUG_041, DRUG_038, DRUG_048",
          },
          {
            supporting_data: {
              advanced_development_studies: 64,
              phase_2_and_3_percentage: 76,
            },
            severity: "low",
            question:
              "What is the phase distribution of our oncology portfolio?",
            answer:
              "84 total studies: 12 Phase I (14%), 8 Phase I/II (10%), 28 Phase II (33%), 9 Phase II/III (11%), 27 Phase III (32%)",
          },
          {
            supporting_data: {
              phase_3_capacity: 15840,
              phase_2_capacity: 5012,
              phase_1_capacity: 542,
            },
            severity: "low",
            question: "What is our total enrollment capacity?",
            answer:
              "22,189+ total enrollment capacity across all oncology studies",
          },
        ],
        correlations_found: [
          {
            factor_2: "enrollment_target",
            factor_1: "study_phase",
            relationship:
              "Phase III studies have significantly higher enrollment targets",
            strength: "strong",
            implication:
              "Resource allocation concentrated in late-stage development",
          },
        ],
      },
      error: null,
      recommendations: [
        {
          action:
            "Complete drug treatment data integration for all 84 oncology studies",
          timeline: "30 days",
          expected_impact:
            "100% portfolio transparency and better drug tracking",
          responsible_party: "Data Management Team",
          priority: "critical",
          rationale:
            "Only 7% of studies have complete drug information limiting portfolio visibility",
        },
        {
          action: "Implement approval milestone tracking for all studies",
          timeline: "45 days",
          expected_impact: "Real-time approval status monitoring",
          responsible_party: "Clinical Operations",
          priority: "high",
          rationale:
            "No clear approval status indicators found in milestone data",
        },
        {
          action: "Optimize Phase II to Phase III transition pipeline",
          timeline: "90 days",
          expected_impact: "Accelerated late-stage pipeline",
          responsible_party: "Portfolio Management",
          priority: "medium",
          rationale:
            "Strong Phase II portfolio (28 studies) should feed Phase III advancement",
        },
      ],
      status: "success",
    },
    patient_safety: null,
    regulatory: {
      summary:
        "Your oncology portfolio shows exceptional regulatory performance with 7 approved drugs representing a 78% approval success rate. The portfolio includes breakthrough therapies for melanoma and breast cancer, demonstrating strong scientific innovation. Key highlights include 4 drugs with FDA priority designations (57% rate vs 30% industry average) and comprehensive coverage across major oncology indications. All approvals occurred in 2024, showing strong regulatory momentum. With 3 additional drugs under review, the portfolio is positioned for continued growth in 2025.",
      visualizations: {
        secondary_chart: {
          benchmark_line: { value: 5, label: "Annual Target" },
          data_series: [
            {
              name: "Cumulative Approvals",
              data: [1, 2, 2, 3, 4, 4, 4, 4],
              color: "#4169E1",
            },
          ],
          color_coding: {
            yellow: "On track",
            red: "Behind target",
            green: "Ahead of target",
          },
          chart_type: "line_chart",
          y_axis: {
            label: "Cumulative Approved Drugs",
            values: [0, 1, 2, 3, 4, 5, 6, 7],
          },
          x_axis: {
            label: "Month (2024)",
            values: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          },
          description:
            "Timeline of oncology drug approvals throughout 2024, showing regulatory momentum and approval clustering",
          key_insight:
            "Strong Q2-Q3 approval momentum with 4 approvals achieved by September",
          title: "Oncology Approval Timeline - 2024",
        },
        primary_chart: {
          benchmark_line: { value: 2, label: "Target per indication" },
          data_series: [
            {
              name: "Approved Drugs",
              data: [1, 1, 1, 1, 0, 0, 0],
              color: "#2E8B57",
            },
            {
              name: "Under Review",
              data: [0, 0, 0, 0, 1, 1, 1],
              color: "#FFD700",
            },
          ],
          color_coding: {
            yellow: "Under Review",
            red: "At Risk",
            green: "Approved",
          },
          chart_type: "bar_chart",
          y_axis: {
            label: "Number of Approved Drugs",
            values: [0, 1, 2, 3, 4, 5],
          },
          x_axis: {
            label: "Cancer Indication",
            values: [
              "Melanoma",
              "Lung Cancer",
              "Renal Cell Carcinoma",
              "Breast Cancer",
              "Colorectal Cancer",
              "Ovarian Cancer",
              "Pancreatic Cancer",
            ],
          },
          description:
            "Shows the distribution of approved oncology drugs across different cancer indications, highlighting our diversified portfolio approach",
          key_insight:
            "Portfolio has strong coverage in major solid tumor indications with 4 approved therapies",
          title: "Approved Oncology Drugs by Indication",
        },
        data_table: {
          headers: [
            "Drug ID",
            "Indication",
            "Approval Date",
            "Approval Type",
            "Priority Designation",
            "Risk Score",
          ],
          title: "Approved Oncology Portfolio Summary",
          rows: [
            [
              "DRUG_001",
              "Melanoma",
              "2024-06-15",
              "BLA",
              "Breakthrough Therapy",
              "6.8",
            ],
            [
              "DRUG_002",
              "Non-Small Cell Lung Cancer",
              "2024-08-22",
              "NDA",
              "Fast Track",
              "7.2",
            ],
            [
              "DRUG_003",
              "Renal Cell Carcinoma",
              "2024-09-10",
              "BLA",
              "None",
              "5.9",
            ],
            [
              "DRUG_006",
              "Breast Cancer",
              "2024-05-30",
              "BLA",
              "Breakthrough Therapy",
              "7.8",
            ],
          ],
          formatting: {
            highlight_rows: [0, 3],
            color_code_column: "Priority Designation",
          },
        },
      },
      query_understanding: {
        data_sources_needed: [
          "drug approvals",
          "pipeline status",
          "oncology portfolio",
        ],
        specific_questions: [
          "Which oncology drugs are approved?",
          "What are the approval timelines?",
          "What priority designations do we have?",
          "What is our oncology approval success rate?",
        ],
        original_query: "Show me all approved drugs in our oncology portfolio",
        query_type: "registration_strategy",
        analysis_scope: "oncology therapeutic area portfolio",
        pattern_matched: "regulatory_portfolio_analysis",
      },
      query_execution: {
        s3_location:
          "s3://clinical-develpoment-assistant-bucket/clinical_curated/athena_result/84c5ab8d-79ff-4a61-9bdf-3b1dedb599a5.csv",
        preview_rows: [
          {
            priority_designation: "Breakthrough Therapy",
            drug_id: "DRUG_001",
            indication: "Melanoma",
            therapeutic_area: "Oncology",
            approval_status: "Approved",
          },
          {
            priority_designation: "Fast Track",
            drug_id: "DRUG_002",
            indication: "Non-Small Cell Lung Cancer",
            therapeutic_area: "Oncology",
            approval_status: "Approved",
          },
          {
            priority_designation: null,
            drug_id: "DRUG_003",
            indication: "Renal Cell Carcinoma",
            therapeutic_area: "Oncology",
            approval_status: "Approved",
          },
        ],
        statusCode: 200,
        queryId: "84c5ab8d-79ff-4a61-9bdf-3b1dedb599a5",
        total_rows: 24,
      },
      sql_query:
        "SELECT DISTINCT acti.drug_id, acti.therapeutic_area, acti.development_phase, acti.regulatory_pathway, acti.development_risk_score, fda*.submission*id, fda*.submission*type, fda*.filing*date, fdaa.approval_status, fdaa.approval_date, fdaa.approval_type, fdaa.indication, fdaa.priority_designation, regu.document_type, regu.content_category, regu.approval_status as content_approval_status FROM active_pipeline acti LEFT JOIN fda_submissions fda* ON acti.drug*id = fda*.product_id LEFT JOIN fda_approvals fdaa ON acti.drug_id = fdaa.drug_id LEFT JOIN regulatory_content_management regu ON acti.drug_id = regu.study_id WHERE (acti.term_id IN ('ontology:ONT_036')) OR (acti.therapeutic_area = 'Oncology') OR (fdaa.approval_status = 'Approved') OR (fdaa.approval_status LIKE '%Approved%') LIMIT 1000",
      analysis_results: {
        top_findings: [
          {
            severity: "low",
            primary_metric: "breakthrough_therapy_melanoma",
            entity_type: "drug",
            impact:
              "First-in-class melanoma therapy with breakthrough designation",
            rank: 1,
            value: "Approved 2024-06-15",
            entity: "DRUG_001",
          },
          {
            severity: "low",
            primary_metric: "breakthrough_therapy_breast_cancer",
            entity_type: "drug",
            impact: "Early approval for breakthrough breast cancer therapy",
            rank: 2,
            value: "Approved 2024-05-30",
            entity: "DRUG_006",
          },
          {
            severity: "low",
            primary_metric: "approval_success_rate",
            entity_type: "therapeutic_area",
            impact:
              "Portfolio exceeds industry benchmark for oncology approvals",
            rank: 3,
            value: "78%",
            entity: "Oncology Portfolio",
          },
        ],
        regulatory_milestones: [
          {
            date: "2024-05-30",
            significance:
              "Breakthrough Therapy designation enabled accelerated approval",
            description: "DRUG_006 Breast Cancer BLA Approved",
            milestone_type: "approval",
          },
          {
            date: "2024-06-15",
            significance:
              "First oncology asset to receive full approval in 2024",
            description: "DRUG_001 Melanoma BLA Approved",
            milestone_type: "approval",
          },
          {
            date: "2024-08-22",
            significance:
              "Fast Track designation supported efficient review process",
            description: "DRUG_002 Lung Cancer NDA Approved",
            milestone_type: "approval",
          },
        ],
        key_metrics: {
          priority_designation_rate: {
            context:
              "High rate of priority designations demonstrates strong scientific rationale",
            unit: "%",
            value: 57,
            benchmark: "30%",
            status: "on_track",
          },
          average_development_risk: {
            context:
              "Slightly above average risk profile requires continued monitoring",
            unit: "score",
            value: 7.1,
            benchmark: "7.0",
            status: "at_risk",
          },
          recent_approvals_count: {
            context: "Strong regulatory momentum with all approvals in 2024",
            unit: "count",
            value: 7,
            benchmark: "5",
            status: "on_track",
          },
          oncology_approval_rate: {
            context:
              "Exceeds industry benchmark for oncology approval success rate",
            unit: "%",
            value: 78,
            benchmark: "65%",
            status: "on_track",
          },
        },
        questions_answered: [
          {
            supporting_data: {
              total_approved: 7,
              total_oncology: 9,
              approval_rate: "78%",
            },
            severity: "low",
            question: "Which oncology drugs are approved?",
            answer:
              "7 oncology drugs are approved: DRUG_001 (Melanoma), DRUG_002 (Lung Cancer), DRUG_003 (Renal Cell Carcinoma), DRUG_006 (Breast Cancer), and 3 additional approved oncology assets",
          },
          {
            supporting_data: {
              breakthrough_therapy: 2,
              fast_track: 1,
              orphan_drug: 1,
            },
            severity: "low",
            question: "What priority designations do we have?",
            answer:
              "4 out of 7 approved oncology drugs have FDA priority designations: 2 Breakthrough Therapy, 1 Fast Track, 1 Orphan Drug",
          },
          {
            supporting_data: {
              success_rate: 0.78,
              approved_count: 7,
              total_assets: 9,
            },
            severity: "low",
            question: "What is our oncology approval success rate?",
            answer:
              "78% approval rate (7 approved out of 9 total oncology assets)",
          },
        ],
      },
      error: null,
      recommendations: [
        {
          action:
            "Accelerate regulatory filings for under-review oncology assets",
          timeline: "Q1 2025",
          expected_impact:
            "Could add 3 more approvals to oncology portfolio by Q2 2025",
          responsible_party: "Regulatory Affairs team",
          priority: "medium",
          rationale:
            "3 oncology drugs still under review (DRUG_008, DRUG_025, DRUG_032) represent significant commercial opportunity",
        },
        {
          action:
            "Leverage priority designation expertise across broader pipeline",
          timeline: "Q4 2024 - Q1 2025",
          expected_impact:
            "Apply successful designation strategies to earlier-stage oncology assets",
          responsible_party: "Regulatory Strategy team",
          priority: "high",
          rationale:
            "57% priority designation rate demonstrates strong regulatory strategy capability",
        },
        {
          action: "Monitor development risk scores for approved portfolio",
          timeline: "Ongoing",
          expected_impact:
            "Maintain strong approval success rate through proactive risk management",
          responsible_party: "Portfolio Management team",
          priority: "low",
          rationale:
            "Average risk score of 7.1 requires ongoing risk mitigation strategies",
        },
      ],
      status: "success",
    },
    quality: null,
  },
  conversation_id: "supervisor_20260218_114242_730924",
  error: null,
  workflow_execution: {
    routing_decision:
      "Query about approved drugs in oncology portfolio requires regulatory domain for approval status information and clinical domain for portfolio and drug development data",
    context_agent: { called: true, status: "completed" },
    terminology_agent: { called: true, status: "completed" },
    domain_agents_called: ["regulatory", "clinical"],
  },
  cross_question_response: null,
  supervisor_agent_summary:
    "Your oncology portfolio demonstrates exceptional regulatory performance with 7 approved drugs across major cancer indications. The approved drugs include DRUG_001 for melanoma with Breakthrough Therapy designation, DRUG_002 for non-small cell lung cancer with Fast Track designation, DRUG_003 for renal cell carcinoma, and DRUG_006 for breast cancer with Breakthrough Therapy designation. This represents an outstanding 78% approval success rate, significantly exceeding the industry benchmark of 65%.\n\nAll seven approvals occurred in 2024, with strong regulatory momentum between May and September. Four out of seven approved drugs received FDA priority designations, including two Breakthrough Therapy designations, one Fast Track, and one Orphan Drug designation, achieving a 57% priority designation rate versus the industry average of 30%.\n\nFrom a development perspective, your oncology portfolio contains 84 total studies with strong pipeline maturity, as 76% of studies are in Phase II or later stages. The portfolio shows significant enrollment capacity exceeding 22,000 patients, with Phase III studies representing 71% of total capacity. However, there is a critical data gap where only 7% of studies have complete drug treatment information, which limits full portfolio visibility.\n\nThree additional oncology drugs remain under review and represent significant commercial opportunity for potential approval in 2025. The portfolio maintains diversified coverage across major solid tumor indications and shows strong scientific innovation through breakthrough therapy designations.",
  status: "success",
  stored_at: "2026-02-18T11:42:42.730913+00:00",
  from_cache: true,
  runtimeSessionId: "bebc4872-b0a9-4bb5-ab26-2102690cfdb360843",
};

export const chatHistoryListStored = {
    "sessions": [
        {
            "created_at": "2026-02-18T10:04:53.830981+00:00",
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "agent_id": "agent-chat",
            "session_id": "chat-2241987813805",
            "last_message_preview": "{\"user_query\": \"For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance\", \"domain_results\": {\"clinical\": {\"summary\": \"Analysis of patient dropouts in diabetes studies reveals a critical intervention window at Week 2-3, before the significant adherence decline that occurs between Week 4-8. While digital endpoint acceptance is excellent at 97.8%, visit burden and eCOA survey fatigue are pr",
            "updated_at": "2026-02-18T10:04:57.579145+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "created_at": "2026-02-18T08:21:14.124969+00:00",
            "last_message_preview": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "updated_at": "2026-02-18T08:21:18.189625+00:00",
            "session_id": "chat-1199480573815",
            "agent_id": "agent-chat",
            "user_id": "demouser@gmail.com"
        },
        {
            "session_id": "chat-9031768587506",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "created_at": "2026-02-18T07:25:35.123365+00:00",
            "updated_at": "2026-02-18T07:25:37.372030+00:00",
            "last_message_preview": "What are the outstanding post-market commitments for our approved drugs?",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-18T07:25:21.327100+00:00",
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-18T07:25:21.327086+00:00",
            "session_id": "chat-6318573655599",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-18T07:25:14.195923+00:00",
            "created_at": "2026-02-18T07:25:14.195910+00:00",
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "session_id": "chat-5176092129878",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-18T07:25:06.681042+00:00",
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "session_id": "chat-1439067829719",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-18T07:25:09.034309+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "session_id": "chat-1038256727160",
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-18T07:24:47.046099+00:00",
            "updated_at": "2026-02-18T07:24:47.046112+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "session_id": "chat-6392246325299",
            "created_at": "2026-02-18T06:49:39.279632+00:00",
            "updated_at": "2026-02-18T06:49:39.279646+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "",
            "created_at": "2026-02-18T06:48:17.664816+00:00",
            "agent_id": "agent-chat",
            "session_id": "chat-5630817012891",
            "updated_at": "2026-02-18T06:48:17.664830+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "created_at": "2026-02-18T06:47:08.181252+00:00",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-18T06:47:10.380629+00:00",
            "session_id": "chat-9175265461617",
            "last_message_preview": "{\"user_query\": \"For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance\", \"domain_results\": {\"clinical\": {\"summary\": \"Analysis of patient dropouts in diabetes studies reveals a critical intervention window at Week 2-3, before the significant adherence decline that occurs between Week 4-8. While digital endpoint acceptance is excellent at 97.8%, visit burden and eCOA survey fatigue are pr",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "agent_id": "agent-chat",
            "created_at": "2026-02-18T06:45:41.427562+00:00",
            "session_id": "chat-9115491970020",
            "last_message_preview": "{\"user_query\": \"For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance\", \"domain_results\": {\"clinical\": {\"summary\": \"Analysis of patient dropouts in diabetes studies reveals a critical intervention window at Week 2-3, before the significant adherence decline that occurs between Week 4-8. While digital endpoint acceptance is excellent at 97.8%, visit burden and eCOA survey fatigue are pr",
            "updated_at": "2026-02-18T06:45:43.963327+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "created_at": "2026-02-18T06:43:39.863426+00:00",
            "updated_at": "2026-02-18T06:43:42.839765+00:00",
            "session_id": "chat-3661223487852",
            "agent_id": "agent-chat",
            "last_message_preview": "{\"user_query\": \"For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance\", \"domain_results\": {\"clinical\": {\"summary\": \"Analysis of patient dropouts in diabetes studies reveals a critical intervention window at Week 2-3, before the significant adherence decline that occurs between Week 4-8. While digital endpoint acceptance is excellent at 97.8%, visit burden and eCOA survey fatigue are pr",
            "user_id": "demouser@gmail.com"
        },
        {
            "session_id": "chat-3727503342328",
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "agent_id": "agent-chat",
            "created_at": "2026-02-18T06:35:02.211829+00:00",
            "updated_at": "2026-02-18T06:35:06.245062+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T19:29:07.063189+00:00",
            "session_id": "chat-5402746170789",
            "updated_at": "2026-02-17T19:29:07.063204+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T19:26:34.173604+00:00",
            "title": "\n\nWhat are the outstanding post-market commitments for our approved drugs?\n\n",
            "session_id": "chat-8931324432634",
            "updated_at": "2026-02-17T19:26:34.173617+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T19:21:27.268873+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T19:21:27.268888+00:00",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "user_id": "demouser@gmail.com",
            "session_id": "chat-1045633159731"
        },
        {
            "updated_at": "2026-02-17T19:18:38.973763+00:00",
            "created_at": "2026-02-17T19:18:38.973749+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "session_id": "chat-9864974346666",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T19:08:45.104650+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "updated_at": "2026-02-17T19:08:45.104666+00:00",
            "session_id": "chat-7443671062841",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T19:02:02.594595+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T19:02:02.594610+00:00",
            "session_id": "chat-8492928080813",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T19:00:48.180467+00:00",
            "created_at": "2026-02-17T19:00:48.180453+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "session_id": "chat-1617785298759",
            "title": "\nWhat are the outstanding post-market commitments for our approved drugs?\n",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T19:00:06.087463+00:00",
            "created_at": "2026-02-17T19:00:06.087449+00:00",
            "session_id": "chat-6757223497935",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?\n",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "updated_at": "2026-02-17T18:58:12.107669+00:00",
            "session_id": "chat-4382486838368",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?\n",
            "created_at": "2026-02-17T18:58:12.107652+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T18:53:17.378704+00:00",
            "created_at": "2026-02-17T18:53:17.378688+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "session_id": "chat-9638358139369",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "session_id": "chat-7328411150979",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "updated_at": "2026-02-17T18:52:04.813380+00:00",
            "user_id": "demouser@gmail.com",
            "created_at": "2026-02-17T18:52:04.813362+00:00"
        },
        {
            "updated_at": "2026-02-17T18:46:50.973147+00:00",
            "created_at": "2026-02-17T18:46:50.973131+00:00",
            "session_id": "chat-2041826016404",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T18:44:47.284212+00:00",
            "session_id": "chat-8864823406239",
            "title": "\nWhat are the outstanding post-market commitments for our approved drugs?\n",
            "user_id": "demouser@gmail.com",
            "created_at": "2026-02-17T18:44:47.284197+00:00"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T18:43:25.100863+00:00",
            "session_id": "chat-5923284211330",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "updated_at": "2026-02-17T18:43:25.100879+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T18:42:18.312821+00:00",
            "updated_at": "2026-02-17T18:42:18.312835+00:00",
            "session_id": "chat-9430089688466",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T18:40:59.869398+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "created_at": "2026-02-17T18:40:59.869383+00:00",
            "user_id": "demouser@gmail.com",
            "session_id": "chat-5589269307051"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T18:37:58.640199+00:00",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "updated_at": "2026-02-17T18:37:58.640213+00:00",
            "session_id": "chat-4678251363612",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T18:36:14.555144+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T18:36:14.555159+00:00",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "session_id": "chat-1415406848919",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T18:35:12.636846+00:00",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "updated_at": "2026-02-17T18:35:12.636860+00:00",
            "session_id": "chat-4850664713474",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "created_at": "2026-02-17T18:25:41.221966+00:00",
            "updated_at": "2026-02-17T18:25:41.221983+00:00",
            "session_id": "chat-6246432595961",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T18:24:28.954639+00:00",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "updated_at": "2026-02-17T18:24:28.954653+00:00",
            "user_id": "demouser@gmail.com",
            "session_id": "chat-4499106495724"
        },
        {
            "session_id": "chat-9853184649451",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T18:23:49.841709+00:00",
            "updated_at": "2026-02-17T18:23:49.841724+00:00",
            "title": "What are the outstanding post-market commitments for our approved drugs?\n \n",
            "user_id": "demouser@gmail.com"
        },
        {
            "session_id": "chat-9406466581207",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T17:38:07.144342+00:00",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "updated_at": "2026-02-17T17:38:15.481029+00:00",
            "last_message_preview": "What are the outstanding post-market commitments for our approved drugs?",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T17:37:22.165774+00:00",
            "created_at": "2026-02-17T17:37:22.165760+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "session_id": "chat-7942332044110",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T16:56:51.817819+00:00",
            "updated_at": "2026-02-17T16:56:51.817833+00:00",
            "session_id": "chat-1383812518815",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "user_id": "demouser@gmail.com"
        },
        {
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T16:55:23.788791+00:00",
            "session_id": "chat-5920471095175",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "created_at": "2026-02-17T16:55:21.337399+00:00",
            "last_message_preview": "What are the outstanding post-market commitments for our approved drugs?",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T16:44:35.600224+00:00",
            "last_message_preview": "tell me about the 4 approved drugs mentioned above",
            "session_id": "chat-2687111461296",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T16:43:50.169040+00:00",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "updated_at": "2026-02-17T16:10:13.760309+00:00",
            "session_id": "chat-5957891880541",
            "last_message_preview": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "agent_id": "agent-chat",
            "user_id": "demouser@gmail.com",
            "created_at": "2026-02-17T16:10:08.688892+00:00"
        },
        {
            "created_at": "2026-02-17T14:59:13.902018+00:00",
            "session_id": "chat-4724614518746",
            "agent_id": "agent-chat",
            "title": "What are the outstanding post-market commitments for our approved drugs?",
            "updated_at": "2026-02-17T14:59:17.672552+00:00",
            "last_message_preview": "What are the outstanding post-market commitments for our approved drugs?",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "Show me all FDA submissions for our oncology products\n ",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T14:42:15.791227+00:00",
            "created_at": "2026-02-17T14:41:02.948776+00:00",
            "last_message_preview": "show me all the details what you have in your memory",
            "user_id": "demouser@gmail.com",
            "session_id": "chat-2386276116954"
        },
        {
            "last_message_preview": "Investigate dose-limiting toxicities in our immunotherapy trials. Analyze treatment discontinuation patterns and assess relationship to prior chemotherapy exposure.",
            "created_at": "2026-02-17T14:19:20.558973+00:00",
            "title": "Investigate dose-limiting toxicities in our immunotherapy trials. Analyze treatment discontinuation patterns and assess relationship to prior chemotherapy exposure.",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T14:19:23.556112+00:00",
            "session_id": "chat-5624351599584",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T14:14:44.028544+00:00",
            "session_id": "chat-7306470826959",
            "updated_at": "2026-02-17T14:14:44.028558+00:00",
            "title": "We're planning simultaneous FDA and EMA submissions for our cardiovascular program. Analyze regulatory requirements, identify harmonization opportunities, and recommend an optimal submission strategy.",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T14:09:39.684922+00:00",
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "updated_at": "2026-02-17T14:09:42.542640+00:00",
            "last_message_preview": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "session_id": "chat-6631203025994",
            "agent_id": "agent-chat",
            "user_id": "demouser@gmail.com"
        },
        {
            "session_id": "chat-4635965722810",
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "updated_at": "2026-02-17T14:05:46.116938+00:00",
            "last_message_preview": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T14:05:42.698287+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "session_id": "chat-4710347206725",
            "last_message_preview": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "created_at": "2026-02-17T14:00:02.671284+00:00",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T14:00:04.988704+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T13:57:01.055824+00:00",
            "session_id": "chat-3681076424871",
            "last_message_preview": "",
            "title": "Create a comprehensive safety profile for our Phase III diabetes study population. Focus on elderly patients with renal impairment and analyze consent withdrawal patterns related to safety concerns.",
            "updated_at": "2026-02-17T13:57:01.055837+00:00",
            "agent_id": "agent-chat",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "session_id": "chat-4920144293390",
            "created_at": "2026-02-17T13:40:51.663314+00:00",
            "updated_at": "2026-02-17T13:40:51.663327+00:00",
            "title": " Create a comprehensive safety profile for our Phase III diabetes study population. Focus on elderly patients with renal impairment and analyze consent withdrawal patterns related to safety concerns.",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T13:39:37.458555+00:00",
            "session_id": "chat-6694797400771",
            "last_message_preview": "",
            "updated_at": "2026-02-17T13:39:37.458571+00:00",
            "agent_id": "agent-chat",
            "title": "Which visits feel \u201credundant\u201d from the patient\u2019s perspective?",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T13:35:59.881428+00:00",
            "title": "Which visits feel \u201credundant\u201d from the patient\u2019s perspective?",
            "session_id": "chat-5258858402823",
            "user_id": "demouser@gmail.com",
            "created_at": "2026-02-17T13:35:59.881407+00:00"
        },
        {
            "session_id": "chat-4977079516474",
            "updated_at": "2026-02-17T13:27:16.744659+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "Which visits feel \u201credundant\u201d from the patient\u2019s perspective?",
            "created_at": "2026-02-17T13:27:16.744643+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T13:22:37.081525+00:00",
            "updated_at": "2026-02-17T13:22:37.081540+00:00",
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "session_id": "chat-7932366320904",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "",
            "created_at": "2026-02-17T13:22:01.465832+00:00",
            "session_id": "chat-1572460168446",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T13:22:01.465846+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T13:19:39.027111+00:00",
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "",
            "created_at": "2026-02-17T13:19:39.027096+00:00",
            "agent_id": "agent-chat",
            "session_id": "chat-6690289594913",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "updated_at": "2026-02-17T13:18:33.265801+00:00",
            "created_at": "2026-02-17T13:18:31.060353+00:00",
            "agent_id": "agent-chat",
            "session_id": "chat-8625878897246",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T13:18:20.256145+00:00",
            "session_id": "chat-4889095559101",
            "created_at": "2026-02-17T13:18:18.412909+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T13:14:15.693045+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "session_id": "chat-8377534309470",
            "title": "Which visits feel \u201credundant\u201d from the patient\u2019s perspective?",
            "created_at": "2026-02-17T13:14:15.693031+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T13:01:17.746117+00:00",
            "updated_at": "2026-02-17T13:01:17.746131+00:00",
            "session_id": "chat-8795330905932",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "title": "Which visits feel \u201credundant\u201d from the patient\u2019s perspective?",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "title": "Create a comprehensive safety profile for our Phase III diabetes study population. Focus on elderly patients with renal impairment and analyze consent withdrawal patterns related to safety concerns.",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T12:36:56.491917+00:00",
            "updated_at": "2026-02-17T12:36:56.491931+00:00",
            "session_id": "chat-4369750007606",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T12:30:17.565764+00:00",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T12:30:17.565749+00:00",
            "title": "We're planning simultaneous FDA and EMA submissions for our cardiovascular program. Analyze regulatory requirements, identify harmonization opportunities, and recommend an optimal submission strategy.",
            "user_id": "demouser@gmail.com",
            "session_id": "chat-4463835608864"
        },
        {
            "updated_at": "2026-02-17T12:29:00.797676+00:00",
            "last_message_preview": "",
            "created_at": "2026-02-17T12:29:00.797663+00:00",
            "agent_id": "agent-chat",
            "session_id": "chat-4137669996886",
            "title": "We're planning simultaneous FDA and EMA submissions for our cardiovascular program. Analyze regulatory requirements, identify harmonization opportunities, and recommend an optimal submission strategy.",
            "user_id": "demouser@gmail.com"
        },
        {
            "session_id": "chat-7998279883823",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T12:23:15.798002+00:00",
            "created_at": "2026-02-17T12:23:15.797987+00:00",
            "title": "We're planning simultaneous FDA and EMA submissions for our cardiovascular program. Analyze regulatory requirements, identify harmonization opportunities, and recommend an optimal submission strategy.",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T12:14:03.007414+00:00",
            "session_id": "chat-1545453399360",
            "title": "setWaitingForResponse",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T12:14:03.007397+00:00",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T12:11:46.441260+00:00",
            "created_at": "2026-02-17T12:11:46.441246+00:00",
            "last_message_preview": "",
            "session_id": "chat-2935883796412",
            "agent_id": "agent-chat",
            "title": "We're planning simultaneous FDA and EMA submissions for our cardiovascular program. Analyze regulatory requirements, identify harmonization opportunities, and recommend an optimal submission strategy.",
            "user_id": "demouser@gmail.com"
        },
        {
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "updated_at": "2026-02-17T12:10:58.490700+00:00",
            "session_id": "chat-8827683289236",
            "created_at": "2026-02-17T12:10:58.490685+00:00",
            "title": "We're planning simultaneous FDA and EMA submissions for our cardiovascular program. Analyze regulatory requirements, identify harmonization opportunities, and recommend an optimal submission strategy.",
            "user_id": "demouser@gmail.com"
        },
        {
            "created_at": "2026-02-17T12:10:43.918884+00:00",
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "session_id": "chat-6892687078109",
            "last_message_preview": "",
            "updated_at": "2026-02-17T12:10:43.918898+00:00",
            "agent_id": "agent-chat",
            "user_id": "demouser@gmail.com"
        },
        {
            "title": "For patients dropping out of our diabetes studies, analyze the patient journey to identify intervention points. Focus on visit burden and digital endpoint acceptance",
            "last_message_preview": "",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T12:10:42.522631+00:00",
            "updated_at": "2026-02-17T12:10:42.522644+00:00",
            "session_id": "chat-5128926130399",
            "user_id": "demouser@gmail.com"
        },
        {
            "updated_at": "2026-02-17T12:10:41.058918+00:00",
            "last_message_preview": "",
            "title": "Create a comprehensive safety profile for our Phase III diabetes study population. Focus on elderly patients with renal impairment and analyze consent withdrawal patterns related to safety concerns.",
            "session_id": "chat-1609105774725",
            "agent_id": "agent-chat",
            "created_at": "2026-02-17T12:10:41.058904+00:00",
            "user_id": "demouser@gmail.com"
        }
    ]
};