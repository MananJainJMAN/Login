{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH required_fields as(
    select
        _id as plan_id,
    planName,
    moduleID,
    department,
    -- Extract start_date and start_time from the startDate in schedule
	convert(date,SUBSTRING(schedule, 16, 10)) AS start_date,
	convert(date,SUBSTRING(schedule, 50, 19)) AS end_date,
	convert(time, SUBSTRING(schedule, 27, 8)) AS start_time,
    convert(time, SUBSTRING(schedule, 61, 8)) AS end_time

    from {{source('etms','plans_data')}}
)

select 
*
 from required_fields