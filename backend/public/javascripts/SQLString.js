const SQLString_test = `
with feature as (
select
    'Feature' as "type",
    ST_AsGeoJSON(geom)::json as "geometry",
    json_strip_nulls(row_to_json(row(state_name,land_km,persons))) as "properties"
from
    public.states as st
where
    st.state_name = 'Delaware'
),
features as(
select
    'FeatureCollection' as "type",
    array_to_json(array_agg(feature.*)) as "feature"
from
    feature
)

select row_to_json(features.*) from features
`
const SQLString =`
with properties as(
    select row_to_json(t)
from(
    select state_name, persons from public.states
)t
where state_name = 'Delaware'
),
feature as (
    select
'Feature' as "type",
    ST_AsGeoJSON(geom)::json as "geometry",
    row_to_json(properties.*) as "properties"
from
public.states as st,
    properties
where
st.state_name = 'Delaware'
)

select row_to_json(feature.*) from feature
`
module.exports = SQLString;
