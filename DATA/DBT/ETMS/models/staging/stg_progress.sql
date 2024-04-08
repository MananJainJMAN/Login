{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH required_fields as(
    select
    _id as progress_id,
    moduleID, 
    completionStatus,
    UserID as user_id
    from {{source('etms','progress_data')}}
)

select * from required_fields