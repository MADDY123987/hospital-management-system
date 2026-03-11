# Build stage
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /build
COPY . .

RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

COPY --from=builder /build/target/Hospital-Mangement-System-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java","-jar","app.jar"]