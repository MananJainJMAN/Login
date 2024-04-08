{{
    config(
        tags=['mart']
    )
}}

WITH ModuleAssessmentSummary AS (
    SELECT
        [moduleID],
        COUNT(DISTINCT [user_id]) AS given_by_employee_count,
        AVG([score]) AS average_score
    FROM
        {{ref("stg_assessment")}}
    GROUP BY
        [moduleID]
),


TrainingPlanDetails AS (
    SELECT
    p.[plan_id],
        p.[planName] AS training_name,
        p.[moduleID],
        mo.[moduleName],
        p.[department],
        p.[start_date],
        p.[end_date],
        p.[start_time],
        p.[end_time],
        DATEDIFF(HOUR, CONCAT(p.[start_date], ' ', p.[start_time]), CONCAT(p.[end_date], ' ', p.[end_time])) AS duration_in_hours,
        m.given_by_employee_count,
        m.average_score
    FROM
        {{ref("stg_plans")}} p
    LEFT JOIN
        ModuleAssessmentSummary m ON p.[moduleID] = m.[moduleID]
    LEFT JOIN
       {{ref("stg_modules")}} mo ON p.[moduleID] = mo.[moduleID]
)

SELECT
   t.training_name,
    t.[moduleName],
	t.department,
        t.duration_in_hours,
    t.given_by_employee_count,
    t.average_score,
        CASE
        WHEN t.duration_in_hours > 0 THEN t.average_score / t.duration_in_hours
        ELSE 0  -- Handle division by zero if duration is zero (fallback)
    END AS training_efficiency
FROM
    TrainingPlanDetails t


