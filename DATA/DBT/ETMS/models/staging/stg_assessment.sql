{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH required_fields as(
    select
    userId as user_id,
    moduleId as moduleID,
    cast(score as int) score,
    cast(totalScore as int) totalScore

    from {{source('etms','assessment_data')}}
)

select * from required_fields