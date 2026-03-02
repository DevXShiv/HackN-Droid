from ai.services.query_expansion_service import expand_query

query = "impact of AI on jobs in india"

result = expand_query(query)

print("Original Query:")
print(query)

print("\nExpanded Queries:")
for r in result:
    print("-", r)