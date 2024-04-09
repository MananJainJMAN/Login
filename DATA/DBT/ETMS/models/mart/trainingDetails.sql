{{
    config(
        tags=['mart']
    )
}}

select
 m.moduleName,
 m.difficultyLevel,
 m.duration
  FROM {{ref("stg_plans")}} p join {{ref("stg_modules")}} m on m.moduleID = p.moduleID
