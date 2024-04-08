{{
    config(
        tags=['mart']
    )
}}

WITH AssessmentSummary AS (
    SELECT
        a.[user_id],
        MIN(a.[score]) AS min_score,
        MAX(a.[score]) AS max_score
    FROM
        {{ref("stg_assessment")}} a
    GROUP BY
        a.[user_id]
),
users AS (
    SELECT
        [user_id],
        [email] AS user_email  -- Assuming 'email' is the column with user names
    FROM
        {{ref("stg_users")}}
),
progressSummary AS (
    SELECT
        p.[user_id],
        COUNT(CASE WHEN p.[completionStatus] = 'In Progress' THEN 1 END) AS module_in_progress,
        COUNT(CASE WHEN p.[completionStatus] = 'Completed' THEN 1 END) AS module_completed
    FROM
       {{ref("stg_progress")}} p
    GROUP BY
        p.[user_id]
)


select
 u.user_email as  email,
 		
		m_min.[moduleName] AS min_score_moduleName,
        a.min_score,
            m_max.[moduleName] AS max_score_moduleNam, 
            a.max_score,
            	ps.module_in_progress,
		ps.module_completed
from 
AssessmentSummary a 
join
 users as u on a.user_id = u.user_id 
left join
 {{ref("stg_assessment")}} as  ma_min ON a.[user_id] = ma_min.[user_id] AND a.min_score = ma_min.[score]
 left join
 {{ref("stg_modules")}}  m_min ON ma_min.[moduleID] = m_min.[moduleID]
 left join 
 {{ref("stg_assessment")}}  ma_max ON a.[user_id] = ma_max.[user_id] AND a.max_score = ma_max.[score]
LEFT JOIN
{{ref("stg_modules")}} m_max ON ma_max.[moduleID] = m_max.[moduleID]
left join
 progressSummary ps ON a.[user_id] = ps.[user_id];