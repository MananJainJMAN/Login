{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH required_fields as(
    select
    _id as user_id,
    email,
    department
    from {{source('etms','users_data')}}
)

select * from required_fields