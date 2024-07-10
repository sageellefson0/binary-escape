source = "codesignal"

def solution(source: str, pattern: str) -> int:
    
    matches = 0
    n = len(pattern)
    
    for i in range(len(source) - n + 1):
        if ifMatch(source[i: i + n], pattern):
            matches+=1
    
    return matches

def ifMatch(substr: str, pattern: str) -> bool:
    
    for i, binary in enumerate(pattern):
        
        if binary == "0" and substr[i] not in "aeiouy":
            return False
        if binary == "1" and substr[i] in "aeiouy":
            return False
    
    return True
    
            
print(solution(source, "100"))