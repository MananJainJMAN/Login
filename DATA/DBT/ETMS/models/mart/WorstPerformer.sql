{{
    config(
        tags=['mart']
    )
}}

WITH RankedAssessment AS (
    SELECT 
        a.[user_id],
        a.[moduleID],
        a.[score],
        a.[totalScore],
        u.[email],
        m.[moduleName],
        ROW_NUMBER() OVER (PARTITION BY a.[moduleID] ORDER BY a.[score] ASC) AS Rank
    FROM 
        {{ref("stg_assessment")}} a
    INNER JOIN 
        {{ref("stg_users")}} u ON a.[user_id] = u.[user_id]
    INNER JOIN 
        {{ref("stg_modules")}} m ON a.[moduleID] = m.[moduleID]
)

SELECT 

    [email],
    [moduleName],
    [score],
    [totalScore]
FROM 
    RankedAssessment
WHERE 
    Rank <= 10 