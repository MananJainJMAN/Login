{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH required_fields as(
    select
    _id as moduleID,
    moduleName,
    cast(duration as int) as duration,
    difficultyLevel
    from {{source('etms','modules_data')}}
)

select * from required_fields